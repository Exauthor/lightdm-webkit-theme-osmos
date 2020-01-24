<template lang='pug'>
  .login-settings(ref='body')
    h1 {{ $t('settings.title') }}:
    .settings-themes-item(
      v-for='(theme, i) in themes' 
      :key='i' 
      :style='`background: url(${setImage(theme.name.toLowerCase())}) no-repeat center/cover`'
      @click='changeTheme(theme)'
    )
      h4 {{theme.name}}
    .settings-themes-item(
      v-for='(background, index) in backgrounds'
      :key='`${index}-background`' :style='`background: url(${backgrounds[index]}) no-repeat center/cover`'
    )
</template>

<script>
import { backgrounds } from '@/lightdm'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LoginComponent',
  data() {
    return {
      backgrounds: backgrounds()
    }
  },
  computed: {
    ...mapState('settings', ['themes', 'loginPosition']),
  },
  mounted() {
    const block = this.$refs.body || document.querySelector('.login-settings')

    console.log(this.$refs.body, 'this.$refs.body')
    block.addEventListener('scroll', this.handleScroll, { passive: false })
  },
  destroyed () {
    const block = document.querySelector('.login-settings')
    block.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll(event) {
      console.log(event)
      event.stopPropagation()
      event.preventDefault()
    },
    ...mapMutations('settings', ['CHANGE_SETTINGS']),
    setImage(name) {
      try {
        var index = require(`@/assets/images/themes/${name}/index.png`);
      } catch {
        var index = 'notFound'
      }
      return index
    },
    changeTheme(theme) {
      this.CHANGE_SETTINGS({ key: 'currentTheme', value: theme.name })

      document.documentElement.style
        .setProperty('--color-active', theme.color.active);
      
      document.documentElement.style
        .setProperty('--color-bg', theme.color.background);
    }
  }
}
</script>

<style lang="stylus"></style>
