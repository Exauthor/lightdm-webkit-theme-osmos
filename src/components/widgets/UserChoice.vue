<template lang='pug'>
  .widget-dual.widget-block
    AppIcon.icon-circle.icon(:name='getAvatar(getCurrentUser.image)')
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
      input#password(
        @keyup='handleKeyup'
        type='password' ref='password' placeholder='password'
        v-model='initPassword' :readonly='logging' :class="{'error': error}"
      )
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

<style lang='stylus'></style>
