<template lang="pug">
  .mars
    .stars
    .sun
      .blick.center-position
      .blick.center-position
      .blick.center-position
      .blick.center-position
      .blick.center-position
      .blick.center-position
      .kore
    .mountain-back
    .mountain-second
    .mountain-front
</template>

<style lang="stylus">
.mars
  width 100%
  height 100vh
  overflow hidden
  position relative
  background linear-gradient(to top, #FF3E45 0%, #C83545 15vw, #642345 25vw, #2F1F49)
  .stars
    &:before
      display: none
  .sun
    width 20vmin
    height 20vmin
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    background url(../../assets/images/themes/mars/Sun.svg) 50% bottom/ contain no-repeat
    .kore
      position absolute
      width 100%
      height 100%
      background url(../../assets/images/themes/mars/Sun.svg) 50% bottom/ contain no-repeat
    .blick
      background linear-gradient(to top, rgba(201, 41, 57, .8) 0%, transparent 70%)
      border-radius 50%
      animation resize 20s infinite alternate
      &:nth-child(1)
        width 150%
        height 150%
      &:nth-child(2)
        width 230%
        height 230%
        animation-delay .5s
      &:nth-child(3)
        width 330%
        height 330%
        animation-delay 1s
      &:nth-child(4)
        width 470%
        height 470%
        animation-delay 1.5s
      &:nth-child(5)
        width 670%
        height 670%
        animation-delay 2s
      &:nth-child(6)
        width 900%
        height 900%
        animation-delay 2.5s

@keyframes resize
  from 
    transform translate(-50%, -50%) scale(1)
  to 
    transform translate(-50%, -50%) scale(.9)

.mountain-back
  width 100vw
  height 30vw
  position absolute
  bottom 0
  left 0
  background url(../../assets/images/themes/mars/MountainBack.svg) 50% bottom/ contain no-repeat


.mountain-second
  width 100vw
  height 30vw
  position absolute
  bottom 0
  left 0
  background url(../../assets/images/themes/mars/MountainSecond.svg) 50% bottom/ contain no-repeat

.mountain-front
  width 100vw
  height 30vw
  position absolute
  bottom -3vw
  left 0
  background url(../../assets/images/themes/mars/MountainFront.svg) 50% bottom/ contain no-repeat
</style>
