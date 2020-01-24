<template lang='pug'>
  .background-image(:class='classObject')
    component(:is='theme.component' class='background-item center-position')
</template> 

<script>
import fire from '@/components/themes/fire';
import mars from '@/components/themes/mars';
import { mapState, mapGetters } from 'vuex';
import osmos from '@/components/themes/osmos';
import space from '@/components/themes/space';
import timeComponent from '@/components/themes/time';

export default {
  name: 'BackgroundTheme',
  components: {
    timeComponent,
    fire,
    osmos,
    mars,
    space
  },
  computed: {
    ...mapState('settings', ['loginPosition']),
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
    ...mapGetters('page', ['isOpenBlock']),
    classObject() {
      return {
        [`background-${this.loginPosition}`]: true && this.isOpenLogin,
        ['background-fullscreen']: this.theme.fullscreen || !this.isOpenLogin
      }
    },
    isOpenLogin() {
      return this.isOpenBlock('login')
    }
  },
}
</script>

<style lang='stylus'>
:root
   --margin-login: 30ch;

.background-left
  margin-left var(--margin-login)

.background-image
  position absolute
  overflow hidden
  width 100%
  height 100vh
  width calc(100% - var(--margin-login))
  transition .5s

.background-center, .background-top, .background-bottom
  width 100%

.background-fullscreen
  width 100%
  margin 0

.background-item
  position absolute

.background-bottom
  height calc(100vh - var(--login-height))

.background-top
  top var(--login-height)
  height calc(100vh - var(--login-height))
</style>
