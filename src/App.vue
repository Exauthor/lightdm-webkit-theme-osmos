<template lang="pug">
  #app
    transition(name="fade")
      router-view
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    methods: {
      ...mapMutations('system', ['SET_SETTINGS'])
    },
    mounted() {
      this.SET_SETTINGS();
      this.$router.push({name: 'intro'});
    },
  }
</script>

<style lang="stylus">
@import './assets/style/index.styl';
</style>
