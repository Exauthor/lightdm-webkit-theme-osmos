<template lang='pug'>
  transition(name='slide-right')
    .login-menu(v-if='isOpen' :class='{ "fullscreen": theme.fullscreen }')
      .login-form
        UserChoice.mb-3
        DEChoice.mb-3
        Clock
        SystemButtons
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import UserChoice from '@/components/widgets/UserChoice';
import Clock from '@/components/widgets/Clock';
import DEChoice from '@/components/widgets/DEChoice';

import SystemButtons from '@/components/SystemButtons';
import BackgroundImage from '@/components/BackgroundImage';

export default {
  name: 'LoginComponent',
  components: {
    BackgroundImage,
    SystemButtons,
    UserChoice,
    DEChoice,
    Clock
  },
  computed: {
    ...mapState('system', ['settings']),
    ...mapGetters('page', ['isOpenBlock']),
    theme() {
      return this.settings.theme
    },
    isOpen() {
      return this.isOpenBlock('login')
    }
  },
  mounted() {
    this.ADD_ACTIVE_BLOCK('login')
    window.addEventListener('keyup', this.keyPress)
  },
  methods: {
    ...mapMutations(['SET']),
    ...mapMutations('page', ['ADD_ACTIVE_BLOCK']),
    ...mapActions('page', ['closeActiveBlock', 'openActiveBlock']),
    keyPress(event) {
      const ENTER_CODE = 13
      if (event.which === ENTER_CODE) {
        if (!this.isOpen) {
          this.openActiveBlock({ id: 'login' })
        } else if (this.isOpen) {
          document.querySelector('#password').focus()
        } else {
          this.submit();
        }
      }

      if (event.key === "Escape") {
        this.closeActiveBlock()
      }
    }
  },
}
</script>

<style lang="stylus">
.login-menu
  width 15vw
  min-width 30ch
  height 100vh
  border-left 2px var(--color-active) solid
  transition .5s
  position absolute
  right 0
  &.fullscreen
    border none
    background rgba(0,0,0,.8)
  &.hide
    transform translateX(100%)

.login-form
  padding 10px 

.mb-3
  margin-bottom 12px
</style>
