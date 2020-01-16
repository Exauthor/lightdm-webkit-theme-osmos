<template lang='pug'>
  .selection(@click.stop='openList' :class='{"selection-open": isOpen}')
    span {{ checkedValue }}
    .selection-icon
    transition(name='menu-popover')
      ul.selection-list(v-if='isOpen')
        li.selection-list-item(
          v-for='(item, i) in items'
          :key='i' @click.stop='changeItem(item)'
        ) {{item.name || item.username}}
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
    interactiveBlock: {
      type: String,
      required: true
    },
    actions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkedValue: ''
    }
  },
  computed: {
    ...mapGetters('page', ['getBlock']),
    isOpen: {
      get() {
        return this.getBlock(this.interactiveBlock)
      },
      set(open) {
        if (open) {
          this.openActiveBlock({ id: this.interactiveBlock })
        } else {
          this.closeActiveBlock({ id: this.interactiveBlock })
        }
      }
    }
  },
  mounted() {
    this.checkedValue = this.value
  },
  methods: {
    ...mapActions(['globalDistributor']),
    ...mapActions('page', ['closeActiveBlock', 'openActiveBlock']),
    changeItem(item) {
      this.checkedValue = item.name || item.username
      this.globalDistributor(this.actions
        .filter((action) => action.on === 'change')
        .map((action) => Object.assign(action, {value: this.checkedValue})))
      this.isOpen = !this.isOpen
    },
    openList() {
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

.selection-list
  position absolute
  width 100%
  text-align center
  left 0
  z-index 1
  border-radius 7px
  overflow hidden
  & .selection-list-item
    padding 4px 5px
    background rgba(0,0,0,.7)
    &:hover
      text-shadow 0 0 7px currentColor
      background rgba(0,0,0,.8)
</style>
