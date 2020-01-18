<template lang='pug'>
  transition(:name='`slide-${loginPosition}`')
    .login-menu(v-if='isOpen' :class='classObject')
      div(:class='{"wizard-blocks": ["bottom", "top"].includes(loginPosition)}')
        UserChoice.mb-3
        DEChoice.mb-3
        Clock
      SystemButtons(:class='[["bottom", "top"].includes(loginPosition) ? "system-buttons-right" : "system-buttons-bottom"]')
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
    ...mapState('settings', ['loginPosition']),
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
    ...mapGetters('page', ['getBlock']),
    classObject({ loginPosition, theme }) {
      return {
        [`login-${loginPosition}`]: true,
        ['login-fullscreen']: theme.fullscreen
      }
    },
    isOpen() {
      return this.getBlock('login')
    }
  }
}
</script>

<style lang="stylus">
.login
  position absolute
  right 0

.login-menu
  padding 10px
  position absolute
  right 0
  width 30ch
  overflow hidden
  height 100%
  border-left 2px var(--color-active) solid

.login-fullscreen
  border none
  background rgba(0,0,0,.8)

.login-center
  position absolute
  left 50%
  top 50%
  transform translate(-50%, -50%)
  background rgba(0, 0, 0, .8)
  border-radius 5px
  border 2px var(--color-active) solid
  padding-bottom 60px
  max-width 50vmin
  width inherit
  height auto

.login-left
  left 0%
  border-left none
  border-right 2px var(--color-active) solid

.login-top
  width 100%
  left 0
  height auto

.login-bottom
  width 100%
  height auto
  bottom 0
  overflow visible

.login-form
  padding 10px 

.wizard-blocks
  display flex
  .wizard-dual
    min-width 20vw

.mb-3
  margin-bottom 12px
</style>
