<template lang='pug'>
  .wizard-dual
    AppIcon(:name='icon').icon
    .wizard-block
      SelectItem(
        mode='desktop'
        :item='settings.desktop'
        :icon='false'
      )
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserChoiceWidget',  
  computed: {
    ...mapState('system', ['settings']),
    icon() {
      let key = this.settings.desktop.key.toLowerCase();

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
      } if (key.indexOf('i3') > -1) {
        return 'i3';
      } if (key.indexOf('xmonad') > -1) {
        return 'xmonad';
      } if (key.indexOf('budgie') > -1 || key.indexOf('solus') > -1) {
        return 'budgie';
      }
    }
  }
};
</script>

<style lang='stylus'></style>
