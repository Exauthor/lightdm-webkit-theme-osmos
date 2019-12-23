<template lang='pug'>
  transition(name='popover')
    .settings(v-if='isOpen')
      .settings-header
        .settings-titles
          h3.settings-title(
            v-for='(title, index) in tabs' :key='index' 
            :class='{"active": title === currentTabSettings}'
            @click='changeTab(title)'
          ) {{ formatTitle(title) }}
        .exit-button(@click='closeSettings')
          AppIcon(name='close')
      transition-group(tag='div' name='slide-right' style='height: calc(100% - 20px); overflow: hidden; position: relative;')
        .settings-body(v-if='currentTabSettings === "setting"' key='settings')
          h3 Settings system
        .settings-themes(v-else-if='currentTabSettings === "theme"' key='theme')
          .settings-themes-item(
            v-for='(theme, i) in themes' 
            :key='i' 
            :style='`background: url(${setImage(theme.name.toLowerCase())}) no-repeat center/cover`'
            @click='changeTheme(theme)')
            h4 {{theme.name}}
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'SettingsWindow',
  data() {
    return {
      currentTabSettings: 'theme',
      tabs: ['theme', 'setting']
    }
  },
  computed: {
    ...mapState(['themes']),
    ...mapGetters('page', ['isOpenBlock']),
    isOpen() {
      return this.isOpenBlock('settings')
    }
  },
  // beforeDestroy() {
  //   console.log('BEFORE DESTROY')
  //   this.closeSettings()
  // },
  methods: {
    ...mapMutations(['SET']),
    ...mapMutations('system', ['CHANGE_SETTINGS']),
    ...mapActions('page', ['closeActiveBlock']),
    formatTitle(title) {
      return title[0].toUpperCase() + title.slice(1, title.length) + 's'
    },
    changeTab(title) {
      this.currentTabSettings = title
    },
    closeSettings() {
      this.closeActiveBlock({ id: 'settings'})
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
.settings
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

.settings-body
  width 100%
  overflow hidden

.settings-themes
  display flex
  justify-content space-between
  flex-wrap wrap
  height calc(100% - 20px)
  overflow-y scroll
  overflow-x hidden
  position absolute
  left 0
  top 0

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

.settings-header
  display flex
  align-items center
  justify-content space-between
  margin-bottom 12px

.settings-titles
  display flex
  align-items center

.settings-title
  margin-right 12px
  transition .3s border-color
  cursor pointer
  border-bottom 2px solid transparent
  &.active
    border-color var(--color-active)

.exit-button
  width 5vmin
  height 5vmin
  max-width 25px
  max-height 25px
  margin-right 10px
  cursor pointer
</style>
