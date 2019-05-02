<template lang='pug'>
  transition(name='slide-right')
    .login-menu(v-if='openLogin' :class='[(theme.fullscreen) ? "fullscreen" : "", (!openLogin) ? "hide" : ""]')
      .login-form
        .login-form_user
          icon(mode='user' :item='settings.user')
          form(@submit.prevent='submit')
            SelectItem(
              mode='user'
              :item='settings.user'
              :icon='false')
            input(type='password' ref='password' v-model='password' placeholder='password' :readonly='logging', :class="{'error': error}")
        .login-form_desktop
          icon(mode='desktop' :item='settings.desktop')
          form
            select-item(
              mode='desktop'
              :item='settings.desktop'
              :icon='false')
        .login-bottom
          system-button(type='shutdown')
          system-button(type='restart')
          system-button(type='suspend')
          system-button(type='settings')
</template>

<script>
  import SettingsWindow from '@/components/SettingsWindow';
  import LoginComponent from '@/components/LoginComponent';
  import SystemButton from '@/components/SystemButton';
  import BackgroundImage from '@/components/BackgroundImage';
  import SelectItem from '../components/SelectItem';
  import Icon from '../components/Icon';
  import { mapState, mapGetters, mapMutations } from 'vuex'
  
  export default {
    name: 'LoginComponent',
    components: {
      BackgroundImage,
      LoginComponent,
      SettingsWindow,
      SystemButton,
      SelectItem,
      Icon
    },
    data() {
      return {
        canSuspend: lightdm.can_suspend,
        logging: false,
        error: false,
        password: ''
      }
    },
    computed: {
      ...mapState(['openSettings', 'openLogin', 'openUsers', 'openDesktops']),
      ...mapState('system', {
        theme: state => state.settings.theme
      }),
      ...mapState('system', ['settings']),
      ...mapGetters(['CURRENT_THEME'])
    },
    mounted() {
      window.addEventListener('keyup', this.keyPress);
    },
    methods: {
      ...mapMutations(['SET']),
      keyPress(event) {
        if (event.which === 13) {
          if (!this.openLogin) {
            this.SET({type: 'openLogin', items: true});
          } else if (this.openLogin) {
            this.$nextTick(() => {
              this.$refs.password.focus();
            })
          } else {
            this.submit();
          }
        }
  
        if (event.key === "Escape") {
          if (this.openSettings) {
            this.SET({type: 'openLogin', items: true});
            this.SET({type: 'openSettings', items: false});
          } else if (this.openLogin) {
            this.SET({type: 'openLogin', items: false});
            this.SET({type: 'openUsers', items: false});
            this.SET({type: 'openDesktops', items: false});
          }       
        }
      },
      submit() {
  
        if (!this.password) {
          return;
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
  }
</script>

<style lang="stylus" scoped>
.login-menu
  width 15vw
  min-width 30ch
  height 100vh
  border-left 2px var(--color-active) solid
  position relative
  transition .5s
  position absolute
  right 0
  &.fullscreen
    border none
    background rgba(0,0,0,.8)
  &.hide
    transform translateX(100%)

.login-form
  padding 10px 
  & > *
    margin-bottom 10px

.login-form_user, .login-form_desktop
  display flex
  justify-content space-around

form
  width calc(100% - 12vmin)
  display flex 
  flex-direction column
  justify-content space-around

input
  background none
  border none
  border-bottom 2px var(--color-active) solid
  width 100%
  color var(--colort-active)
  &:focus
    outline none

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
