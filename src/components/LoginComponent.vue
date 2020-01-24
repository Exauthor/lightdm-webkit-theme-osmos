<template lang='pug'>
  transition(:name='`slide-${loginPosition}`')
    .login-menu(v-if='isOpen' :class='classObject')
      transition(:name='`slide-${loginPosition}`')
        .login-content(v-if='!isOpenSettings' key='content')
          div(:class='{"widget-blocks": ["bottom", "top"].includes(loginPosition)}')
            UserChoice.mb-3
            DEChoice.mb-3
            Clock.mb-3
            CommonSettings
          SystemButtons(:class='[["bottom", "top"].includes(loginPosition) ? "system-buttons-right" : "system-buttons-bottom"]')
        LoginSettings(v-else-if='isOpenSettings' key='settings')
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import UserChoice from '@/components/widgets/UserChoice';
import CommonSettings from '@/components/widgets/CommonSettings';
import Clock from '@/components/widgets/Clock';
import DEChoice from '@/components/widgets/DEChoice';

import LoginSettings from '@/components/LoginSettings';

import SystemButtons from '@/components/SystemButtons';
import BackgroundImage from '@/components/BackgroundImage';

export default {
  name: 'LoginComponent',
  components: {
    BackgroundImage,
    CommonSettings,
    LoginSettings,
    SystemButtons,
    UserChoice,
    DEChoice,
    Clock
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
  },
  methods: {
    ...mapMutations('settings', ['CHANGE_SETTINGS']),
    setImage(name) {
      try {
        var index = require(`@/assets/images/themes/${name}/index.png`);
      } catch {
        var index = 'notFound'
      }
      return index
    },
    changeTheme(theme) {
      this.CHANGE_SETTINGS({ key: 'currentTheme', value: theme.name })

      document.documentElement.style
        .setProperty('--color-active', theme.color.active);
      
      document.documentElement.style
        .setProperty('--color-bg', theme.color.background);
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


.login-content
  display flex

.login-content, .login-settings
  height 100%
  padding 10px
  overflow visible

.login-left
  left 0%
  border none
  border-right 2px var(--color-active) solid

.login-left, .login-right
  .login-settings
    overflow auto

.login-bottom, .login-top
  border none
  height var(--login-height)
  width 100%
  overflow visible
  .login-content
    width 100vw
  .widget-block
    margin-bottom 0
    margin-right 10px
  .login-settings
    display flex
    overflow auto
    .settings-themes-item
      width 200px
      min-width 200px
      height calc(12vmin - 20px)
      margin 0
      margin-right 15px

.login-bottom
  bottom 0
  border-top 2px var(--color-active) solid

.login-top
  width 100%
  left 0
  height auto
  border none
  overflow visible
  border-bottom 2px var(--color-active) solid

.login-form
  padding 10px 

.widget-blocks
  display flex
  align-items center
  .widget-block
    min-width 200px

.mb-3
  margin-bottom 12px

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
</style>
