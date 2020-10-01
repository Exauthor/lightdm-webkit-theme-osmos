<template lang="pug">
  .space(ref='scene' data-hover-only='true' data-friction-x="0.1" data-friction-y='0.1' data-scalar-x='25' data-scalar-y='15')
    li.prllx-block(data-depth='0.0')
      .main-planet.center-position
    li.prllx-block(data-depth='0.2')
      .ufo
    li.prllx-block(data-depth='0.1')
      .meteor
    li.prllx-block(data-depth='0.07')
      .hole
    li.prllx-block(data-depth='0.02')
      .another-planet
    li.prllx-block(data-depth='0.0')
      h2.welcome.center-position {{ $t('text.welcome') }} <br> {{ getUserName }}
</template>

<script>
import { mapGetters } from 'vuex'
import Parallax from 'parallax-js'

export default {
  name: 'Space',
  computed: {
    ...mapGetters('user', ['getUserName'])
  },
  mounted() {
    new Parallax(this.$refs.scene);
  }
}
</script>

<style lang="stylus">
.space
  width 100%
  height 100%
  overflow hidden
  position relative

h2.welcome
  display flex
  justify-content center
  align-items center
  width 50vmin
  height 50vmin
  border-radius 50%
  background rgba(0,0,0,.6)
  text-align center
  margin 0px auto
  font-size 6vmin 
  color var(--color-blue) 
  filter drop-shadow( 0px 0px 5px var(--color-blue-light)) 
  &:before
    display none

.main-planet
  width 80vmin
  height 80vmin
  background url(../../assets/images/themes/space/MainPlanet.svg) center/contain no-repeat
  transform: translate(-45.5%, -47.5%);

.ufo
  width 25vmin
  height 25vmin
  position absolute
  top 5vh
  left 5vw
  background url(../../assets/images/themes/space/UFO.svg) center/contain no-repeat
  transform rotate(-25deg)

.meteor
  width 25vmin
  height 25vmin
  position absolute
  top 3vh
  right 3vw
  background url(../../assets/images/themes/space/Meteor.svg) center/contain no-repeat
  transform rotate(-25deg)

.another-planet
  width 50vmin
  height 50vmin
  position absolute
  bottom -8vh
  left -6vw
  background url(../../assets/images/themes/space/YellowPlanet.svg) center/contain no-repeat

.hole
  width 23vmin
  height 23vmin
  position absolute
  bottom 1vw
  right 1vw
  transform rotate(25deg)
  filter drop-shadow(0 0 1vmin #ff1c76)
  background url(../../assets/images/themes/space/Hole.svg) center/contain no-repeat
</style>
