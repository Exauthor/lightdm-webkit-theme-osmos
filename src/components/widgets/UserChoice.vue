<template lang='pug'>
  .widget-dual.widget-block
    AppIcon.icon-circle.icon.mr-2(:name='getAvatar(getCurrentUser.image)')
    .widget-interactive
      SelectItem(
        name='user'
        interactiveBlock='selectorUser'
        :items='users'
        :value='username'
        :actions=`[
          {
            type: 'action',
            on: 'change',
            key: 'username',
            path: 'settings/changeSettings'
          }
        ]`
      )
      .widget-input-block
        input#password(
          @keyup='handleKeyup'
          type='password' ref='password' placeholder='password'
          v-model='initPassword' :readonly='logging' :class="{'error': error}"
        )
        .selection-icon(@click='login')
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'UserChoiceWidget',
  computed: {
    ...mapState('settings', ['users', 'username']),
    ...mapState('user', ['password', 'logging', 'error']),
    ...mapGetters('settings', ['getAvatar', 'getCurrentUser']),
    initPassword: {
      get() {
        return this.password
      },
      set(value) {
        if (this.error) {
          this.SET_USER_STATE({ key: 'error', value: false})
        }
        this.SET_USER_STATE({ key: 'password', value})
      }
    }
  },
  methods: {
    ...mapMutations('user', ['SET_USER_STATE']),
    ...mapActions('user', ['login']),
    handleKeyup(event) {
      const ENTER_CODE = 13
      if (event.which === ENTER_CODE) {
        this.login()
      }
    }
  }
};
</script>

<style lang='stylus'>
.widget-input-block
  display flex
  width 100%
  input
    width 10%
    margin-right 10px
    flex 1 1 auto
  .selection-icon
    flex 0 0 auto
    &::before
      transform translate(4px, 6px) rotate(90deg)
</style>
