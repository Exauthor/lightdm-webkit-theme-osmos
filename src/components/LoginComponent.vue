<template lang='pug'>
  transition(name='slide-right')
    .login-menu(v-if='openLogin' :class='[(theme.fullscreen) ? "fullscreen" : "", (!openLogin) ? "hide" : ""]')
      .login-form
        UserChoice
        DEChoice
        SystemButtons
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import UserChoice from '@/components/widgets/UserChoice';
import DEChoice from '@/components/widgets/DEChoice';

import SystemButtons from '@/components/SystemButtons';
import SettingsWindow from '@/components/SettingsWindow';
import LoginComponent from '@/components/LoginComponent';
import BackgroundImage from '@/components/BackgroundImage';

export default {
  name: 'LoginComponent',
  components: {
    BackgroundImage,
    LoginComponent,
    SettingsWindow,
    SystemButtons,
    UserChoice,
    DEChoice
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


</style>
