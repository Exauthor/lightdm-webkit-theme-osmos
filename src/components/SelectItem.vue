<template lang='pug'>
 .item(
   :class='[(mode === "user") ? "user" : "desktop", (openUsers && mode === "user") ? "selected" : (openDesktops && mode === "desktop") ? "selected" : ""]' 
   @click='openList')
   span.username(v-if="mode === 'user'") {{ item.username }}
   span.decktop(v-else) {{ item.name }}
   .item_icon
   transition(name='menu-popover')
     .item-list(v-if='openUsers && mode === "user"')
       ul
         li(v-for='(item, i) in items' :key='i' @click='changeItem(item)') {{item.username}}
   transition(name='menu-popover')
     .item-list(v-if='openDesktops && mode === "desktop"')
       ul
         li(v-for='(item, i) in items' :key='i' @click='changeItem(item)') {{item.name}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'select-item',
  props: ['mode'],
  computed: {
    ...mapState(['openUsers', 'openDesktops']),
    ...mapState('system', ['settings']),
    item:  {
      get() {
        return this.settings[this.mode]
      },
      set(value) {
        return value
      }
    },
    items() {
      return this.settings[this.mode + 's']
    }
  },
  methods: {
    ...mapMutations(['SET']),
    ...mapMutations('system', ['CHANGE_SETTINGS']),
    changeItem(item) {
      this.CHANGE_SETTINGS({key: this.mode, value: item})
      this.item = item;
    },
    openList() {
      if (this.mode === 'user') {
        this.SET({type: 'openUsers', items: !this.openUsers})
      } else {
        this.SET({type: 'openDesktops', items: !this.openDesktops})
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
.item
  position relative
  text-align left
  .item_icon
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
  &.selected
    .item_icon
      &::before
        transform translate(3px, 7px) rotate(180deg)

.username 
  text-align left
  font-size 1.2rem
.item-list
  ul 
    position absolute
    width 100%
    text-align center
    left 0
    z-index 1
    border-radius 7px
    overflow hidden
    & li
      padding 4px 5px
      background rgba(0,0,0,.4)
      &:hover
        text-shadow 0 0 6px currentColor
        background rgba(0,0,0,.7)
</style>
