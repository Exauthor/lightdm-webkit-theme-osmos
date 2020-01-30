<template lang='pug'>
  .index
    BackgroundImage
    LoginComponent
    MainModal
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import LoginComponent from '@/components/LoginComponent.vue'
import MainModal from '@/components/MainModal.vue'
import BackgroundImage from '@/components/BackgroundImage'

export default {
  name: 'Index',
  components: {
    BackgroundImage,
    LoginComponent,
    MainModal
  },
  computed: {
    ...mapState('page', ['activeModal']),
    ...mapGetters('page', ['getBlock', 'getActiveBlock']),
    isOpenLogin() {
      return this.getBlock('login')
    }
  },
  mounted() {
    window.addEventListener('keyup', this.keyPress)
    window.addEventListener('click', this.handleClick)
    setTimeout(this.openActiveBlock, 2000, { id: 'login' })
  },
  destroyed() {
    this.closeActiveBlock()
    window.removeEventListener('keyup', this.keyPress)
    window.removeEventListener('click', this.handleClick)
  },
  methods: {
    ...mapMutations('page', ['SET_PAGE']),
    ...mapActions('page', ['closeActiveBlock', 'openActiveBlock']),
    handleClick(event) {
      const node = event.target
      if (!this.getActiveBlock) {
        this.openActiveBlock({ id: 'login' })
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
        if (this.activeModal) {
          this.SET_PAGE({ key: 'activeModal', value: false })
        } else {
          this.closeActiveBlock()
        }
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
