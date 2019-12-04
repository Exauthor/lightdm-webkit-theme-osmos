<template lang='pug'>
  .login-bottom
    SystemButton(type='shutdown')
    SystemButton(type='restart')
    SystemButton(type='suspend')
    SystemButton(type='settings')
</template>

<script>
import SystemButton from '@/components/common/SystemButton';

export default {
  name: 'SystemButtons',
  components: {
    SystemButton
  }
}
</script>

<style lang='stylus'>
.login-bottom
  width 100%
  position absolute
  bottom 0
  left 0
  display flex
  justify-content space-between
  background var(--color-active)
  margin 0
  padding 5px 10px
</style>
