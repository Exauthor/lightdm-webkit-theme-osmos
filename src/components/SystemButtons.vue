<template lang='pug'>
  .system-buttons
    .system-button(
      v-for='(button, index) in buttons'
      :key='index'
      @click.stop.prevent='handleClick(button)'
    )
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
    ...mapMutations('page', ['SET_PAGE']),
    handleClick(button) {
      if (button === 'settings') {
        this.openActiveBlock({ id: 'settings' })
      } else {
        this.SET_PAGE({ key: 'activeModal', value: button})
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

.system-buttons
  background var(--color-active)

.system-buttons-right
  height 100%
  position absolute
  right 0
  bottom 0
  display flex
  justify-content space-between
  flex-direction column
  margin 0
  padding 5px 5px

.system-buttons-bottom
  width 100%
  position absolute
  bottom 0
  left 0
  display flex
  justify-content space-between
  margin 0
  padding 5px 10px
</style>
