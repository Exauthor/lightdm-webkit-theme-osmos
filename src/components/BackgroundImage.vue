<template lang='pug'>
  .background-image(:class='[(!theme.fullscreen && isOpenLogin) ? "not-fullscreen" : ""]')
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
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
    ...mapGetters('page', ['isOpenBlock']),
    isOpenLogin() {
      return this.isOpenBlock('login')
    }
  },
}
</script>

<style lang='stylus'>
.background-image
  position absolute
  overflow hidden
  width 100%
  height 100vh
  transition width .5s

.not-fullscreen
  width calc(100% - 30ch)

.background-item
  position absolute

.fullscreen
  width 100vw
</style>
