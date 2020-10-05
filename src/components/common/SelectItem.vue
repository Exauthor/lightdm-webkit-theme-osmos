<template lang='pug'>
  .selection(
    @click.stop='openList'
    :class='{"selection-open": true || "isOpen"}'
    ref='selector'
  )
    span.mr-2 {{ checkedValue.text || checkedValue }}
    .selection-icon
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'SelectItem',
  props: {
    value: {
      type: [String, Object]
    },
    items: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isOpen: false,
      checkedValue: '',
    }
  },
  watch: {
    value() {
      this.checkedValue = this.value
    }
  },
  mounted() {
    this.checkedValue = this.value
  },
  methods: {
    ...mapMutations('page', ['ASSING_MENU']),
    openList() {
      let { bottom, left, top, height } = this.$refs.selector.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      this.isOpen = true


      const positionY = (windowHeight - bottom > 100) ? 'bottom' : 'top'
      let position = {}


      if (position === 'bottom') {
        position = {
          bottom: bottom + height,
          left
        }
      } else {
        position = {
          top: top + height,
          left
        }
      }

      this.ASSING_MENU({
        position,
        view: true,
        items: this.items,
        handler: this.callback
      })

      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="stylus">
.selection
  cursor pointer
  position relative
  text-align left
  &.active .item_icon::before
    transform translate(3px, 7px) rotate(180deg)

.selection-open
  .selection-icon::before
    transform translate(3px, 8px) rotate(-180deg)

.selection-icon
  width 20px
  height 20px
  border-radius 15%
  background var(--color-active)
  float right
  &::before
    content ""
    display block
    width 60%
    height 0
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid var(--color-bg);
    transition .4s
    transform translate(3px, 5px)
</style>
