<template lang='pug'>
  .login-settings(
  )
    h1 {{ $t('settings.title') }}:
    .settings-themes-body(ref='listener')
      .settings-themes-items(ref='body' :style='`transform: translateX(${offset}px)`')
        .settings-themes-item(
          @click='changeTheme(theme)'
          v-for='(theme, i) in themes' :key='i'
          :style='`background: url(${setImage(theme.name.toLowerCase())}) no-repeat center/cover`'
        )
          h4 {{ theme.name }}
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
  name: 'LoginSettings',
  data() {
    return {
      backgrounds: backgrounds(),
      offset: 0
    }
  },
  computed: {
    ...mapState('settings', ['themes', 'loginPosition']),
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
  },
  mounted() {
    if (['left', 'right'].includes(this.loginPosition)) {
      return
    }
    const listener = this.$refs.listener
    const block = this.$refs.body

    listener.addEventListener('wheel', this.handleWheel, { passive: false })
  },
  beforeDestroy() {
    const listener = this.$refs.listener
    listener.removeEventListener('wheel', this.handleWheel)
  },
  methods: {
    handleWheel(event) {
      const block = this.$refs.body
      const { wheelDeltaY } = event
      let step = 20
      const maxOffset =  block.scrollWidth - block.clientWidth

      wheelDeltaY > 0 ? step *= 1 : step *= -1
      if (
        (step > 0 && this.offset + step < step) ||
        (step < 0 && Math.abs(this.offset + step) < maxOffset)
      ) {
        this.offset +=step
      }

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

<style lang="stylus">
.settings-themes-body
  width 100%
  height 100%
  position relative
  overflow hidden

.settings-themes-items
  width 100%
  height 100%
  position absolute
  display flex
</style>
