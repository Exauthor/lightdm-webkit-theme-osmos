<template lang='pug'>
    .modal-background(@click.stop='close')
      .modal.position-center
        .modal-title {{ $t(modal.title) }}
        .modal-body {{ $t(modal.text) }}
        .modal-buttons
          .modal-button(@click.stop='close' :class='{ "modal-button--active": activeButton}') {{ $t(modal.no || 'text.no') }}
          .modal-button(@click.stop='submitModal' :class='{ "modal-button--active": !activeButton}') {{ $t(modal.yes || 'text.yes') }}
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'MainModal',
  data() {
    return {
      activeButton: true
    }
  },
  computed: {
    ...mapState('page', ['activeModal', 'event']),
    ...mapGetters('page', ['getCurrentModal']),
    modal() {
      return this.getCurrentModal
    }
  },
  watch: {
    event(value) {
      const code = value && value.code
      if (code !== 'Enter') {
        this.activeButton = code  === 'ArrowLeft' ? true : false
        return
      }

      (this.activeButton ? this.close : this.submitModal)()
    }
  },
  mounted() {
    this.activeButton = true
  },
  methods: {
    ...mapMutations('page', ['SET_PAGE']),
    close() {
      this.SET_PAGE({ key: 'activeModal', value: false })
      this.activeButton = true
    },
    submitModal() {
      setTimeout(lightdm[this.activeModal], 500);
      this.close()
    }
  }
}
</script>

<style lang="stylus">
.modal-background
  z-index 6
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  background rgba(0, 0, 0, .7)

.modal
  border-radius 10px
  border 2px solid
  width 40vmin
  padding 20px
  text-align center
  background rgba(0, 0, 0, .6)
  transform translate(-50%, -50%)

.modal-title
  font-size 2rem
  margin-bottom 15px

.modal-buttons
  margin-top 8px
  display flex

.modal-button
  width 100%
  padding 8px
  cursor pointer

.modal-button--active
  background var(--color-active)
  color var(--color-bg)
</style>
