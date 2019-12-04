<template lang='pug'>
  .login-form-user
    AppIcon(mode='user' :item='settings.user')
    .wizard-block
      SelectItem(
        mode='user'
        :item='settings.user'
        :icon='false')
      input(
        type='password' ref='password' placeholder='password'
      )
        //- v-model='password' :readonly='logging' :class="{'error': error}"
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserChoiceWidget',
  computed: {
    ...mapState('system', ['settings'])
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
svg
  width 100%
  height 100%
</style>
