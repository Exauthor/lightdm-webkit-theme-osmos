<template lang='pug'>
  transition(name='router-anim')
    .modal-background(v-if='modal' @click.stop='close')
      .modal.position-center(@click.stop)
        .modal-title {{ $t(modal.title) }}
        .modal-body {{ $t(modal.text) }}
        .modal-buttons
          .modal-button.modal-button--active(@click.stop='close') {{ $t(modal.no || 'text.no') }}
          .modal-button(@click='submitModal') {{ $t(modal.yes || 'text.yes') }}
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'MainModal',
  computed: {
    ...mapState('page', ['activeModal']),
    ...mapGetters('page', ['getCurrentModal']),
    modal() {
      return this.getCurrentModal
    }
  },
  methods: {
    ...mapMutations('page', ['SET_PAGE']),
    close(value) {
      this.SET_PAGE({ key: 'activeModal', value: false })
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
