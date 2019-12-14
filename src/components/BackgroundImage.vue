<template lang='pug'>
  .background-image(:class='[(theme.fullscreen || !openLogin) ? "fullscreen" : ""]')
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
    ...mapState(['themes', 'openLogin']),
    ...mapState('system', {
      theme: state => state.settings.theme
    }),
  },
}
</script>

<style lang='stylus'>
.background-image
  position absolute
  overflow hidden
  width calc(100% - 30ch)
  height 100vh
  transition width .5s

.background-item
  position absolute

.fullscreen
  width 100vw
</style>
