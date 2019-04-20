<template lang='pug'>
  .settings-body
    .settings-child
      h3 Themes 
      .settings-themes
        .settings-themes-item(
          v-for='(theme, i) in themes' 
          :key='i' 
          :style='`background: url(${setImage(theme.component)}) no-repeat center/cover`'
          @click='changeTheme(theme)')
          h4 {{theme.name}}
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'SettingsWindow',
    computed: {
      ...mapState(['themes']),
    },
    methods: {
      ...mapMutations(['SET']),
      ...mapMutations('system', ['CHANGE_SETTINGS']),
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

</style>
