<template lang="pug">
  #app
    transition(name="fade")
      router-view
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  beforeMount() {
    this.$router.push({ name: 'intro' });
  },
  mounted() {
    this.setTime()
    this.setUpSettings()
    const interactiveBlocks = [
      {
        closeBeforeMount: ['loginPosition', 'language', 'selectorDE'],
        id: 'selectorUser',
      },
      {
        closeBeforeMount: ['loginPosition', 'language', 'selectorUser'],
        id: 'selectorDE',
      },
      {
        closeBeforeMount: ['loginPosition', 'selectorDE', 'selectorUser'],
        id: 'language',
      },
      {
        closeBeforeMount: ['selectorDE', 'language', 'selectorUser'],
        id: 'loginPosition',
      },
      {
        closeBeforeMount: ['selectorUser', 'selectorDE', 'loginPosition', 'language'],
        id: 'login',
        order: 1,
        delay: 500,
        transition: 1500
      },
      {
        id: 'settings',
        openAfterDestroy: ['login']
      }
    ]
    this.SET_PAGE({ key: 'interactiveBlocks', value: interactiveBlocks })
  },
  methods: {
    ...mapMutations('page', ['SET_PAGE']),
    ...mapActions('settings', ['setUpSettings']),
    ...mapActions('page', ['setTime'])
  }
}
</script>

<style lang="stylus">
@import './assets/style/index.styl';
</style>
