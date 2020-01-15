<template lang='pug'>
  transition(name='slide-right')
    .login-menu(v-if='isOpen' :class='{ "login-fullscreen": theme.fullscreen, "login-center": loginView === "center" }')
      UserChoice.mb-3
      DEChoice.mb-3
      Clock
      SystemButtons
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
    ...mapState('system', ['settings']),
    ...mapState('page', {
      'loginView': (state) => state.settings.loginView
    }),
    ...mapGetters('page', ['getBlock']),
    theme() {
      return this.settings.theme
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
  height inherit

.login-form
  padding 10px 

.mb-3
  margin-bottom 12px
</style>
