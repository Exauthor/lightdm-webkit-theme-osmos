<template lang='pug'>
  .login-form-user
    AppIcon(mode='user' :item='settings.user')
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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'UserChoiceWidget',
  computed: {
    ...mapState('system', ['settings']),
    ...mapState('user', ['password', 'logging', 'error']),
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
.icon-container
  width 10vmin
  height 10vmin
  max-width 9ch
  max-height 9ch
  fill var(--color-active)

.user-icon
  border-radius 50%
  border 2px solid var(--color-active)
</style>
