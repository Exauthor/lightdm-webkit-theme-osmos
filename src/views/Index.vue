<template lang='pug'>
  .index
    BackgroundImage
    LoginComponent
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import LoginComponent from '@/components/LoginComponent.vue'
import BackgroundImage from '@/components/BackgroundImage'

export default {
  name: 'Index',
  components: {
    BackgroundImage,
    LoginComponent,
  },
  computed: {
    ...mapGetters('page', ['getBlock', 'getActiveBlock']),
    isOpenLogin() {
      return this.getBlock('login')
    }
  },
  mounted() {
    window.addEventListener('keyup', this.keyPress)
    window.addEventListener('click', this.handleClick)
    setTimeout(this.openActiveBlock, 3000, { id: 'login' })
  },
  destroyed() {
    window.removeEventListener('keyup', this.keyPress)
    window.removeEventListener('click', this.handleClick)
  },
  methods: {
    ...mapActions('page', ['closeActiveBlock', 'openActiveBlock']),
    handleClick(event) {
      const node = event.target
      if (!this.getActiveBlock) {
        return
      }
      const parent = document.querySelector('#' + this.getActiveBlock.id)
      const hasInclude = parent.contains(node)

      if (!hasInclude) {
        this.closeActiveBlock()
      }
    },
    keyPress(event) {
      const ENTER_CODE = 13
      const isFocusPassword = document.querySelector('#password:focus')
      if (event.which === ENTER_CODE) {
        if (!this.isOpenLogin) {
          this.openActiveBlock({ id: 'login' })
        } else if (this.isOpenLogin && !isFocusPassword) {
          document.querySelector('#password').focus()
        } else if (this.isOpenLogin && isFocusPassword) {
          return
        }
      }

      if (event.key === 'Escape') {
        this.closeActiveBlock()
      }
    }
  }
}
</script>

<style lang="stylus">
.index
  width 100vw
  height 100vh
  display flex
  overflow hidden
  background var(--color-bg)
  position absolute

.p-absolute
  position absolute

.popover-enter,
.popover-leave-to 
  opacity 0
  transform: translate(-50%, -50%) perspective(900px) rotate3d(70, 0, 0, -30deg);

.popover-enter-to,
.popover-leave 
  opacity 1
  transform: translate(-50%, -50%) perspective(900px) rotate3d(0, 0, 0, 0deg);

.popover-enter-active
  transition .4s

.popover-leave-active 
  transition .2s
</style>
