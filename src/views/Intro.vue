<template lang='pug'>
  #intro
    #content
      img(src='../assets/images/ArchLinux.svg')
      h1 Welcome
</template>

<script>
  export default {
    name: 'intro',
    mounted() {
      setTimeout(() => {
        this.$router.push({name: 'login'});
      }, 2000);
    },
  };
</script>

<style lang="stylus" scoped>
#intro 
  display: flex;
  align-items: center;
  text-align: center;
  height 100vh

#content 
  margin 0 auto
  text-align center
  img
    height 35vh;
  h1
    font-size 3rem
    position relative
    &:before
      content ''
      display block
      width 110%
      height 2px
      background var(--color-active)
      position absolute
      bottom 0
      left 50%
      transform translateX(-50%)
      box-shadow 0 0 1rem var(--color-active)


</style>
