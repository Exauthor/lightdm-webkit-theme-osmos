<template lang='pug'>
  .wizard-dual
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
.user-icon
  border-radius 50%
  border 2px solid var(--color-active)
svg
  width 100%
  height 100%
</style>
