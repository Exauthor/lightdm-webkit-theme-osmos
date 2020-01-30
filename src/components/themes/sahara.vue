<template lang="pug">
  .sahara
    .sand
    .sand-second
    .stars
    .pyramids
    .rocket
</template>

<script>

</script>

<style lang="stylus">

:root {
  --height-sea: 30vh;
} 

.sahara
  width 100%
  height 100vh
  overflow hidden
  position relative
  background radial-gradient(ellipse 249% 104% at bottom, var(--color-active) 0%, #7E2586 15%, #3B1B80 55%, #230C54 85%)

.rocket
  z-index 1
  height 5vw
  width 30vw
  position absolute
  left -7%
  top 45%
  transform translateY(-50%) rotate(-62deg)
  background url('../../assets/images/themes/sahara/rocket.svg') bottom/contain no-repeat

.pyramids
  z-index 1
  height 20vw
  width 30vw
  position absolute
  bottom 2vw
  left 50%
  transform translateX(-50%)
  background url('../../assets/images/themes/sahara/pyramids.svg') bottom/contain no-repeat

.sand
  z-index 2
  height 15vw
  width 100vw
  position absolute
  bottom 0
  left 0
  background url('../../assets/images/themes/sahara/sand-second.svg') bottom/contain no-repeat

.sand-second
  z-index 2
  height 15vw
  width 100vw
  position absolute
  bottom 0
  left 0
  background url('../../assets/images/themes/sahara/sand.svg') bottom/contain no-repeat


.stars, .stars:before
  height 60vh
  width 100vw
  position absolute
  background url('../../assets/images/themes/osmos/stars.svg') 0% top 
  background-size calc(25vmin * 5.3) 25vmin

.stars
  bottom var(--height-sea)

  //   & *:first-child, *:first-child:before
  //     background url('../../assets/images/themes/osmos/MountainBack_Left.svg') 50% bottom/ contain no-repeat

  //   & *:nth-child(2), *:nth-child(2):before
  //     background url('../../assets/images/themes/osmos/MountainSecond_Left.svg') 50% bottom/ contain no-repeat

  //   & *:last-child 
  //     width 95%
  //   & *:last-child, *:last-child:before
  //     background url('../../assets/images/themes/osmos/MountainFront_Left.svg') 50% bottom/ contain no-repeat

  // & .rocks_right
  //   width 50vw
  //   right 0

  //   & *:first-child
  //     width 95%
  //     right 0

  //   & *:first-child, *:first-child:before
  //     background url(../../assets/images/themes/osmos/MountainBack_Right.svg) 50% bottom/ contain no-repeat

  //   & *:nth-child(2), *:nth-child(2):before
  //     background url(../../assets/images/themes/osmos/MountainSecond_Right.svg) 50% bottom/ contain no-repeat

  //   & *:last-child, *:last-child:before
  //     background url(../../assets/images/themes/osmos/MountainFront_Right.svg) 50% bottom/ contain no-repeat

  //   & *:last-child
  //     width 93%
  //     right 0
</style>
