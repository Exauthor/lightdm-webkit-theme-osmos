<template lang='pug'>
  .login-settings(ref='body')
    h1 {{ $t('settings.title') }}:
    .settings-themes-item(
      @click='changeTheme(theme)'
      v-for='(theme, i) in themes' :key='i'
      :style='`background: url(${setImage(theme.name.toLowerCase())}) no-repeat center/cover`'
    )
      h4 {{theme.name}}
    .settings-themes-item(
      @click='changeTheme(background, true)'
      v-for='(background, index) in backgrounds'
      :key='`${index}-background`' :style='`background: url(${backgrounds[index]}) no-repeat center/cover`'
    )
</template>

<script>
import { backgrounds } from '@/lightdm'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoginComponent',
  data() {
    return {
      backgrounds: backgrounds()
    }
  },
  computed: {
    ...mapState('settings', ['themes', 'loginPosition']),
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
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
    ...mapActions('settings', ['changeSettings']),
    setImage(name) {
      try {
        var index = require(`@/assets/images/themes/${name}/index.png`);
      } catch {
        var index = 'notFound'
      }
      return index
    },
    async changeTheme(theme, isImage) {
      await this.changeSettings({ key: 'currentTheme', value: theme.name || 'image-' + theme })

      document.documentElement.style
        .setProperty('--color-active', this.theme.color.active || '#ffffff');
      
      document.documentElement.style
        .setProperty('--color-bg', this.theme.color.background || '#000000');
    }
  }
}
</script>

<style lang="stylus"></style>
