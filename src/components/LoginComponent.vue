<template lang='pug'>
  transition(name='slide-right')
    .login-menu(v-if='openLogin' :class='[(theme.fullscreen) ? "fullscreen" : "", (!openLogin) ? "hide" : ""]')
      .login-form
        UserChoice.mb-3
        DEChoice.mb-3
        Clock
        SystemButtons
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import UserChoice from '@/components/widgets/UserChoice';
import Clock from '@/components/widgets/Clock';
import DEChoice from '@/components/widgets/DEChoice';

import SystemButtons from '@/components/SystemButtons';
import BackgroundImage from '@/components/BackgroundImage';

export default {
  name: 'LoginComponent',
  components: {
    BackgroundImage,
    SystemButtons,
    UserChoice,
    DEChoice,
    Clock
  },
  computed: {
    ...mapState(['openSettings', 'openLogin', 'openUsers', 'openDesktops']),
    ...mapState('system', {
      theme: state => state.settings.theme
    }),
    ...mapState('system', ['settings'])
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
          // think how u can focus on element from another input component
          // this.$nextTick(() => {
          //   this.$refs.password.focus();
          // })
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
    }
  },
}
</script>

<style lang="stylus">
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

.mb-3
  margin-bottom 12px
</style>
