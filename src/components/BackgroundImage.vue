<template lang='pug'>
  .background-image(:class='[(theme.fullscreen || !openLogin) ? "fullscreen" : ""]')
    transition(name="switch")
      component(:is='theme.component' class='background-item center-position')
</template> 

<script>
  import fire from '@/components/themes/fire';
  import osmos from '@/components/themes/osmos';
  import mars from '@/components/themes/mars';
  import space from '@/components/themes/space';
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'background-image',
    components: {
      fire,
      osmos,
      mars,
      space
    },
    computed: {
      ...mapState(['themes', 'theme', 'openLogin']),
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
