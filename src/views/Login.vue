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
  import { mapState, mapGetters, mapMutations } from 'vuex'
  
  export default {
    name: 'login',
    components: {
      BackgroundImage,
      LoginComponent,
      SettingsWindow,
    },
    mounted() {
      window.addEventListener('keyup', this.keyPress);
    },
    computed: {
      ...mapState(['openSettings', 'openLogin', 'theme']),
      ...mapState('system', ['settings']),
      ...mapGetters(['CURRENT_THEME'])
    },
    methods: {
      ...mapMutations(['SET', 'CLOSE_WINDOWS']),
      keyPress(event) {
        if (event.which === 13) {
          if (!this.password) {
            this.SET({type: 'openLogin', items: true})
            setTimeout(() => {
              this.$nextTick(() => {
                if (this.$refs.password) {
                  this.$refs.password.focus();
                }
              })
            }, 300)
          } else {
            this.submit()
          }
        }
  
        if (event.key === "Escape") {
          if (this.openLogin) {
            this.$nextTick(() => {
              this.$refs.password.blur();
            })
            this.CLOSE_WINDOWS();
          } else if (this.openSettings) {
            this.SET({type: 'openLogin', items: true})
            this.SET({type: 'openSettings', items: false})
          } else {
            this.CLOSE_WINDOWS();
          }
        }
      },
      submit() {
  
        if (!this.password) {
          return
        }
  
        this.logging = true;
  
        setTimeout(() => {
          lightdm_login(this.settings.user.username, this.password, () => {
            setTimeout(() => lightdm_start(this.settings.desktop.key), 400);
          }, () => {
            this.error = true;
            this.password = '';
            this.logging = false;
          })
        }, 150);
      }
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
