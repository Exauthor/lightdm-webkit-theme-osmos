<template lang='pug'>
  transition(:name='`slide-${loginPosition}`')
    .login-menu#login(v-if='isOpen' :class='classObject')
      transition-group(
        name='slide-out-bottom'
        tag="div"
        style="height: 100%;"
      )
        .login-content(v-if='!isOpenSettings' key='content')
          div(:class='{"widget-blocks": ["bottom", "top"].includes(loginPosition)}')
            UserChoice.mb-3
            DEChoice.mb-3
            Clock.mb-3
          SystemButtons(:class='[["bottom", "top"].includes(loginPosition) ? "system-buttons-right" : "system-buttons-bottom"]')
        LoginSettings#settings(v-else-if='isOpenSettings' key='settings')
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import UserChoice from '@/components/widgets/UserChoice';
import Clock from '@/components/widgets/Clock';
import DEChoice from '@/components/widgets/DEChoice';

import LoginSettings from '@/components/LoginSettings';

import SystemButtons from '@/components/SystemButtons';
import BackgroundImage from '@/components/BackgroundImage';

export default {
  name: 'LoginComponent',
  components: {
    Clock,
    DEChoice,
    UserChoice,
    LoginSettings,
    SystemButtons,
    BackgroundImage
  },
  computed: {
    ...mapState('settings', ['themes', 'loginPosition']),
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
    ...mapGetters('page', ['getBlock']),
    isOpenSettings() {
      return this.getBlock('settings')
    },
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
:root
  --login-height: 14vmin

.login
  position absolute
  right 0

.login-menu
  position absolute
  right 0
  z-index 5
  width 30ch
  overflow visible
  height 100%
  border-left 2px var(--color-active) solid

.login-fullscreen
  border none
  background rgba(0,0,0,.6)

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

 .login-content
  display flex
  justify-content center

.login-content, .login-settings
  height 100%
  padding 10px
  overflow visible

.login-left
  left 0%
  border none
  border-right 2px var(--color-active) solid

.login-left, .login-right
  .settings-themes-body
    width auto
    height auto
  .settings-themes-items
    height auto
    position relative
    display block
  .login-settings
    overflow auto

.login-bottom, .login-top
  border none
  height var(--login-height)
  min-height 150px
  width 100%
  .system-button
    width 2.5vmin
    height 2.5vmin
  .login-content
    width 100vw
  .widget-block
    margin-bottom 0
    margin-right 10px
  .login-settings
    display flex
    overflow hidden
    .settings-themes-item
      width 200px
      min-width 200px
      height 100%
      margin 0
      margin-right 15px

.login-bottom
  bottom 0
  border-top 2px var(--color-active) solid

.login-top
  width 100%
  left 0
  border none
  overflow visible
  border-bottom 2px var(--color-active) solid

.login-form
  padding 10px 

.widget-blocks
  display flex
  align-items center
  justify-content space-around
  min-width: 80vmin
  .widget-block
    max-width 20vw

.settings-themes-item
  display block
  width calc(30ch - 25px)
  height calc(30ch - 25px)
  margin 0 auto 15px
  border-radius 10px
  overflow hidden
  h4
    background rgba(0,0,0, .5)
    text-align center
    padding 5px
    font-size 1.5rem
    position absolute
    top 0
    left 0
    right 0
</style>
