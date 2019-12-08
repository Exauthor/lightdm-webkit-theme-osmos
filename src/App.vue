<template lang="pug">
  #app
    transition(name="fade")
      router-view
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations('system', ['SET_SETTINGS']),
    ...mapActions('page', ['setTime'])
  },
  mounted() {
    this.SET_SETTINGS();
    this.setTime();
    this.$router.push({name: 'intro'});
  },
}
</script>

<style lang="stylus">

@import './assets/style/index.styl';

</style>
