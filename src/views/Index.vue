<template lang='pug'>
  .index
    BackgroundImage
    LoginComponent
    transition(name='router-anim')
      MainModal(v-if='activeModal')
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
    // window.addEventListener('mousedown', this.handleClick)

    setTimeout(() => {
      this.openActiveBlock({ id: 'login' })
      this.$nextTick(() => document.querySelector('#password').focus())
    }, 700)
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

      if (!parent.contains(node)) {
        this.closeActiveBlock()
      }
    },
    keyPress(event) {
      const ENTER_CODE = 13
      const isFocusPassword = document.querySelector('#password:focus')

      if (event.which === ENTER_CODE) {
        if (this.activeModal) {
          this.SET_PAGE({ key: 'event', value: { code: 'Enter' } })
        } else  if (!this.isOpenLogin) {
          this.openActiveBlock({ id: 'login' })
        } else if (this.isOpenLogin && !isFocusPassword) {
          document.querySelector('#password').focus()
        } else if (this.isOpenLogin && isFocusPassword) {
          return
        }
      }

      if (event.altKey && event.which === 80) { // 80 is 'r' symbol
        this.SET_PAGE({ key: 'activeModal', value: 'shutdown'})
      } else if (event.altKey && event.which === 83) { // 83 is 'r' symbol
        this.SET_PAGE({ key: 'activeModal', value: 'suspend'})
      } else if (event.altKey && event.which === 82) { // 82 is 'r' symbol
        this.SET_PAGE({ key: 'activeModal', value: 'restart'})
      }

      if (event.key === 'Escape') {
        if (this.activeModal) {
          this.SET_PAGE({ key: 'activeModal', value: false })
        } else {
          this.closeActiveBlock()
        }
      }

      const eventsPass = ['ArrowRight', 'ArrowLeft']

      if (eventsPass.includes(event.code)) {
        const eventObject = { code: event.code }
        this.SET_PAGE({ key: 'event', value: eventObject })
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
