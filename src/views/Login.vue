<template lang='pug'>
  .login
    transition(name='switch')
      settingsWindow(v-if='openSettings')
    .login-body
      BackgroundImage
      LoginComponent
</template>

<script>
  import SettingsWindow from '@/components/SettingsWindow.vue';
  import LoginComponent from '@/components/LoginComponent.vue';
  import BackgroundImage from '@/components/BackgroundImage';
  import {mapState} from 'vuex'
  
  export default {
    name: 'login',
    components: {
      BackgroundImage,
      LoginComponent,
      SettingsWindow,
    },
    computed: {
      ...mapState(['openSettings'])
    },
  }
</script>

<style lang="stylus">
.login
  display flex
  height 100vh
  overflow hidden

.login-body
  position relative
  flex 1 0 auto
</style>
