<template lang='pug'>
  .login-bottom
    .system-button(v-for='(button, index) in buttons' :key='index' @click='handleClick(button)')
      AppIcon(:name='button')
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'SystemButtons',
  props: ['type'],
  data() {
    return {
      buttons: ['shutdown', 'restart', 'suspend', 'settings']
    }
  },
  methods: {
    ...mapActions('page', ['openActiveBlock']),
    handleClick(type) {
      if (type === 'settings') {
        this.openActiveBlock({ id: 'settings' })
      } else {
        setTimeout(lightdm[type], 500);
      }
    }
  }
}
</script>

<style lang='stylus'>
.system-button
  width 4vmin
  height 4vmin
  max-width 35px
  max-height 35px
  overflow hidden
  svg
    width 100%
    height 100%

.login-bottom
  width 100%
  position absolute
  bottom 0
  left 0
  display flex
  justify-content space-between
  background var(--color-active)
  margin 0
  padding 5px 10px
</style>
