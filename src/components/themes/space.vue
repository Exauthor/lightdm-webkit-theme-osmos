<template lang="pug">
  .space
    .main-planet.center-position
    .ufo
    .meteor
    .another-planet
    .hole
    h2.welcome.center-position Добро Пожаловать
</template>

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
