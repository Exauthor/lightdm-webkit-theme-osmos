<template lang='pug'>
  div(@mousedown.stop.prevent)
    transition(name='menu-popover')
      ul.selection-list(
        v-if='menu.view'
        :style="getStyle"
        v-click-outside="closeMenu"
      )
        li.selection-list-item(
          v-for='(item, i) in menu.items'
          :key='i'
          @click.stop.prevent='handleCallback(item)'
        ) {{ item.name || item.username || item.text || item }}
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AppMenu',
  data() {
    return {
      checkedValue: '',
      positionSelector: ''
    }
  },
  computed: {
    ...mapState('page', ['menu']),
    getStyle() {
      return Object.entries(this.menu.position).reduce((acc, [property, value]) => {
        acc += `${property}: ${value}px;`
        return acc
      }, '')
    }
  },
  mounted() {
    this.checkedValue = this.value
  },
  methods: {
    ...mapMutations('page', ['ASSING_MENU']),
    async handleCallback(item) {
      if (this.menu.handler) {
        await this.menu.handler(item)
      }

      this.closeMenu()
    },

    closeMenu() {
      this.ASSING_MENU({
        view: false
      })
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
  z-index 10
  border-radius 7px
  overflow hidden
  & .selection-list-item
    padding 4px 5px
    width 100%
    background rgba(0,0,0,.7)
    &:hover
      text-shadow 0 0 7px currentColor
      background rgba(0,0,0,.8)

.selection-list-top
  top 0
  transform translateY(-100%)
</style>
