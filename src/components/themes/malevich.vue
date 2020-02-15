<template lang="pug">
  .malevich(ref='scene' data-hover-only='true' data-friction-x="0.1" data-friction-y='0.1' data-scalar-x='25' data-scalar-y='15')
    li.prllx-block(data-depth='0.0')
      .parralax-item-cube.center-position
    li.prllx-block(data-depth='0.05')
      .parralax-item-bottom-left
      .parralax-item-bottom-right
      .parralax-item-top-right
      .parralax-item-top-left
    li.prllx-block(data-depth='.1')
      .parralax-item-bottom-right-triangle
      .parralax-item-top-left-multi
      .parralax-item-bottom-left-pattern
    li.prllx-block(data-depth='.2')
      .ps-parralax-item-top-right-circle
</template>

<script>
import Parallax from 'parallax-js'

export default {
  name: 'MalevichTheme',
  mounted() {
    new Parallax(this.$refs.scene);
  }
}
</script>

<style lang="stylus">
.malevich
  position relative
  width 100%
  height 100%

.prllx-block
  position absolute
  width 100%
  height 100%
  & *
    position absolute

.parralax-item-cube
  width 20vmin
  height 20vmin
  background black

.parralax-item-bottom-left
  bottom 4%
  left 5%
  width 23vmin
  height 35vmin
  background url(../../assets/images/themes/malevich/bottom-left.svg) center/contain no-repeat

.parralax-item-bottom-left-pattern
  bottom 6%
  left 7%
  width 23vmin
  height 35vmin
  background url(../../assets/images/themes/malevich/bottom-left-pattern.svg) center/contain no-repeat

.parralax-item-bottom-right
  right 3%
  bottom 2%
  width 30vmax
  height 35vmin
  background url(../../assets/images/themes/malevich/bottom-right.svg) center/contain no-repeat

.parralax-item-bottom-right-triangle
  right 19%
  bottom 7%
  width 6.5vmax
  height 6.5vmax
  transform-origin 50% 30%
  animation rotateGear 13s linear infinite
  background url(../../assets/images/themes/malevich/bottom-right-triangle.svg) center/contain no-repeat

.parralax-item-top-left
  top 1%
  left 3%
  width 40vmin
  height 40vmin
  background url(../../assets/images/themes/malevich/top-left.svg) center/contain no-repeat

.parralax-item-top-left-multi
    top 5%
    left 10%
    width 7vmax
    height 7vmax
    animation rotatePs 20s linear infinite
    background url(../../assets/images/themes/malevich/top-left-multi.svg) center/contain no-repeat

.parralax-item-top-right
  width 15vmin
  height 15vmin
  top 5%
  right 8%
  background url(../../assets/images/themes/malevich/top-right.svg) center/contain no-repeat

.parralax-item-top-right-circle
  top 30%
  right 18%
  width 4vmin
  height 4vmin
  background url(../../assets/images/themes/malevich/top-right-circle.svg) center/contain no-repeat

@keyframes rotateGear {
  0%,to {
    transform rotate(-15deg)
  }
  85% {
    transform:rotate(370deg)
  }
}

@keyframes rotatePs { 
  0% {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>
