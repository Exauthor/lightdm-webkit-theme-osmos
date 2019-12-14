<template lang='pug'>
  .wizard-dual
    AppIcon.icon-circle.icon(:type='GET_AVATAR(settings.user.image)')
    .wizard-block
      SelectItem(
        mode='user'
        :item='settings.user'
        :icon='false'
      )
      input(
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
    ...mapState('system', ['settings']),
    ...mapState('user', ['password', 'logging', 'error']),
    ...mapGetters('system', ['GET_AVATAR']),
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
