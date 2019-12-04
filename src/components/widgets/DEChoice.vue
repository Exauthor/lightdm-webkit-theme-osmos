<template lang='pug'>
  .login-form_desktop
    AppIcon(mode='desktop' :item='settings.desktop')
    .wizard-block
      SelectItem(
        mode='desktop'
        :item='settings.desktop'
        :icon='false')
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
