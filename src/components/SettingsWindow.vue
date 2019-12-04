<template lang='pug'>
  .settings-body
    .settings-child
      .settings-title
        h3 Themes 
        .exit-button(@click='closeSettings')
          SystemIcons(type='close' @click='closeSettings')
      .settings-themes
        .settings-themes-item(
          v-for='(theme, i) in themes' 
          :key='i' 
          :style='`background: url(${setImage(theme.name.toLowerCase())}) no-repeat center/cover`'
          @click='changeTheme(theme)')
          h4 {{theme.name}}
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import SystemIcons from '@/components/common/SystemIcons';

export default {
  name: 'SettingsWindow',
  computed: {
    ...mapState(['themes']),
  },
  components: {
    SystemIcons,
  },
  methods: {
    ...mapMutations(['SET']),
    ...mapMutations('system', ['CHANGE_SETTINGS']),
    ...mapGetters(['CONVERT_TO_HSL', 'CHANGE_HSL']),
    closeSettings() {
      this.SET({type: 'openSettings', items: false});
      this.SET({type: 'openLogin', items: true});
    },
    setImage(name) {
      try {
        var index = require(`@/assets/images/themes/${name}/index.png`);
      } catch {
        var index = 'notFound'
      }
      return index
    },
    changeTheme(theme) {
      this.SET({type: 'theme', items: theme});

      this.CHANGE_SETTINGS({key: 'theme', value: theme})

      document.documentElement.style
        .setProperty('--color-active', theme.color.active);
      
      document.documentElement.style
        .setProperty('--color-bg', theme.color.background);
    }
  }
}
</script>

<style lang="stylus">
.settings-body
  position absolute
  left 50%
  top 50%
  z-index 5
  transform translate(-50%, -50%)
  background rgba(0,0,0,.9)
  padding 20px
  border-radius 3vmin
  width 90vmin
  height 70vmin

.settings-child
  height 100%
  h3
    font-size 1.7rem
    text-align center

.settings-themes
  display flex
  justify-content space-between
  flex-wrap wrap
  height calc(100% - 20px)
  overflow-y scroll
  overflow-x hidden

.settings-themes-item
  display block
  width 40vmin
  height 40vmin
  border-radius 10px
  margin-bottom 15px
  overflow hidden
  h4
    background rgba(0,0,0, .5)
    text-align center
    padding 5px
    font-size 1.5rem

.settings-title
  display flex
  justify-content space-between
  align-items center
  padding-bottom 10px

.exit-button
  width 5vmin
  height 5vmin
  max-width 25px
  max-height 25px
  margin-right 10px
  cursor pointer
</style>
