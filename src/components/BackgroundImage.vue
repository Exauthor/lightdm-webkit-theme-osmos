<template lang='pug'>
  .background-image(:class='classObject')
    .background(v-if='getImage' :style='`background-image: url(${getImage})`')
    component(v-else :is='theme.component')
</template> 

<script>
import { mapState, mapGetters } from 'vuex';
import fire from '@/components/themes/fire';
import malevich from '@/components/themes/malevich';
import mars from '@/components/themes/mars';
import osmos from '@/components/themes/osmos';
import space from '@/components/themes/space';
import sahara from '@/components/themes/sahara';
import timeComponent from '@/components/themes/time';

export default {
  name: 'BackgroundTheme',
  components: {
    timeComponent,
    fire,
    osmos,
    mars,
    space,
    sahara,
    malevich
  },
  computed: {
    ...mapState('settings', ['loginPosition']),
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
    ...mapGetters('settings', ['getImage']),
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

.background
  width 100%
  height 100%
  background-size cover
  background-position center
  background-repeat no-repeat

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

.background-item
  position absolute

.background-bottom
  height calc(100vh - var(--login-height))

.background-top
  margin-top var(--login-height)
  height calc(100vh - var(--login-height))

.background-fullscreen
  width 100%
  height 100%
  margin 0

</style>
