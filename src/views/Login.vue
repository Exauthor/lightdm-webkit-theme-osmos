<template lang='pug'>
  .login
    SettingsWindow
    .login-body
      BackgroundImage
      LoginComponent
</template>

<script>
import SettingsWindow from '@/components/SettingsWindow.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import BackgroundImage from '@/components/BackgroundImage'

export default {
  name: 'login',
  components: {
    BackgroundImage,
    LoginComponent,
    SettingsWindow
  }
}
</script>

<style lang="stylus">
.popover-enter,
.popover-leave-to 
  opacity 0
  transform: translate(-50%, -50%) perspective(900px) rotate3d(70, 0, 0, -30deg);

.popover-enter-to,
.popover-leave 
  opacity 1
  transform: translate(-50%, -50%) perspective(900px) rotate3d(0, 0, 0, 0deg);

.popover-enter-active
  transition .4s

.popover-leave-active 
  transition .2s

.login
  display flex
  height 100vh
  overflow hidden

.login-body
  position relative
  flex 1 0 auto
</style>
