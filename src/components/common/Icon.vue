<template lang='pug'>
  transition(name='switch')
    system-icons(:type='icon' :class='{"user-icon": mode === "user"}').icon-container
</template>

<script>
import SystemIcons from '@/components/common/SystemIcons';
import { mapGetters } from 'vuex';

export default {
  name: 'IconItem',
  props: ['mode', 'item'],
  components: {
    SystemIcons,
  },
  computed: {
    ...mapGetters('system', ['GET_AVATAR']),
    icon() {
      if (this.mode === 'user') {
        return this.GET_AVATAR(this.item.image)
      }

      if (this.mode === 'desktop') {
        let key = this.item.key.toLowerCase();
        let icon;

        if (key.indexOf('plasma') > -1 || key.indexOf('kde') > -1) {
          return 'kde';
        } if (key.indexOf('gnome') > -1) {
          return 'gnome';
        } if (key.indexOf('xfce') > -1) {
          return 'xfce';
        } if (key.indexOf('unity') > -1 || key.indexOf('ubuntu') > -1) {
          return 'ubuntu';
        } if (key.indexOf('dde') > -1 || key.indexOf('deepin') > -1) {
          return 'deepin';
        } if (key.indexOf('lxde') > -1 || key.indexOf('lxqt') > -1) {
          return 'lxde';
        } if (key.indexOf('pantheon') > -1 || key.indexOf('elementary') > -1) {
          return 'elementary';
        } if (key.indexOf('mate') > -1) {
          return 'mate';
        } if (key.indexOf('cinnamon') > -1 || key.indexOf('mint') > -1) {
          return 'cinnamon';
        } if (key.indexOf('enlightenment') > -1 || (key.length === 3 && /e[1-9]{2}/g.test(key))) {
          return 'enlightenment';
        } if (key.indexOf('liri') > -1) {
          return 'liri';
        } if (key.indexOf('i3') > -1) {
          return 'i3';
        } if (key.indexOf('xmonad') > -1) {
          return 'xmonad';
        } if (key.indexOf('budgie') > -1 || key.indexOf('solus') > -1) {
          return 'budgie';
        }
      }
    }
  },
};
</script>

<style lang='stylus'>
.icon-container
  width 10vmin
  height 10vmin
  max-width 9ch
  max-height 9ch
  flex-shrink 0
  fill var(--color-active)

.user-icon
  border-radius 50%
  border 2px solid var(--color-active)
svg
  width 100%
  height 100%
</style>
