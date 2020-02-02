<template lang='pug'>
  #intro
    #content
      AppIcon(name='Arch Linux')
      h1 {{ $t('welcome') }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'intro',
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: 'index' })
    }, 2000)
  }
}
</script>

<style lang="stylus">
#intro 
  display: flex;
  align-items: center;
  text-align: center;
  height 100vh

#content 
  margin 0 auto
  text-align center
  svg
    max-height 30vmin
    max-width 30vmin
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
