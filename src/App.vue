<template lang="pug">
  #app
    transition(name="fade")
      router-view
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  mounted() {
    this.setTime()
    this.setUpSettings();
    const interactiveBlocks = [
      {
        closeBeforeMoute: ['selectorDE'],
        id: 'selectorUser',
      },
      {
        closeBeforeMoute: ['selectorUser'],
        id: 'selectorDE',
      },
      {
        closeBeforeMoute: ['loginPosition'],
        id: 'language',
      },
      {
        closeBeforeMoute: ['language'],
        id: 'loginPosition',
      },
      {
        closeBeforeMoute: ['selectorUser', 'selectorDE'],
        id: 'login',
        order: 1,
        delay: 500,
        transition: 1500
      },
      {
        closeBeforeMoute: ['login'],
        id: 'settings',
        openAfterDestroy: ['login']
      }
    ]
    this.SET_PAGE({ key: 'interactiveBlocks', value: interactiveBlocks })
    this.$router.push({name: 'intro'});
  },
  methods: {
    ...mapMutations('settings', ['SET_SETTINGS']),
    ...mapMutations('page', ['SET_PAGE']),
    ...mapActions('settings', ['setUpSettings']),
    ...mapActions('page', ['setTime']),
    ...mapActions('page', ['closeActiveBlock', 'openActiveBlock', 'setTime'])
  }
}
</script>

<style lang="stylus">
@import './assets/style/index.styl';
</style>
