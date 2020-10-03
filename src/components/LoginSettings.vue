<template lang='pug'>
  .login-settings
    .settings-menu
      h2.settings-menu-title(
        v-for="menuItem in menu"
        :key="menuItem"
        @click="activeMenu = menuItem"
        :class="`${activeMenu === menuItem ? 'settings-menu-title--active' : ''}`"
      ) {{ $t(`settings.${menuItem}`) }}
    .settings-themes-body
      swiper(
        :cleanup-styles-on-destroy="false"
        :auto-update="true"
        :options="swiperOption"
        class="settings-themes-items"
      )
        swiper-slide(
          v-for='(theme, i) in themes'
          :key="i"
          class="settings-themes-item"
        )
          .settings-themes-item(
            @click='changeTheme(theme)'
            :style='`background: url(${setImage(theme.name.toLowerCase())}) no-repeat center/cover`'
          )
            h4 {{ theme.name }}
          .settings-themes-item(
            @click='changeTheme(background)'
            v-for='(background, index) in backgrounds'
            :key='`${index}-background`' :style='`background: url(${background}) no-repeat center/cover`'
          )
</template>

<script>
import { backgrounds } from '@/lightdm'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoginSettings',
  data() {
    return {
      menu: ['themes', 'title'],
      activeMenu: 'themes',
      backgrounds: backgrounds(),
      offset: 0,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 10,
        mousewheel: true,
      }
    }
  },
  computed: {
    ...mapState('settings', ['themes', 'loginPosition']),
    ...mapGetters('settings', { theme: 'getCurrentTheme' }),
  },
  methods: {
    ...mapActions('settings', ['changeSettings', 'changeTheme']),
    setImage(name) {
      try {
        var index = require(`@/assets/images/themes/${name}/index.png`);
      } catch {
        var index = 'notFound'
      }
      return index
    }
  }
}
</script>

<style lang="stylus">
.settings-menu
  width 15%
  padding-right 10px

.settings-menu-title
  padding 5px 0
  font-size 1.2rem
  font-weight bold
  cursor pointer
  &::before
    width 100%
    transform scaleX(0) translateX(-50%)
    transition .3s

.settings-menu-title--active
  &::before
    width 100%
    transform scaleX(1) translateX(-50%)

.settings-themes-body
  width 100%
  height 100%
  position relative
  overflow hidden

.settings-themes-items
  width 100%
  height 100%
</style>
