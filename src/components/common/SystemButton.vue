<template lang='pug'>
  .system-button(@click='handleClick')
    SystemIcons(:type='type')
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import SystemIcons from '@/components/common/SystemIcons';

  export default {
    name: 'SystemButton',
    props: ['type', 'disabled'],
    components: {
      SystemIcons
    },
    computed: {
      ...mapState(['openSettings']),
    },
    methods: {
      ...mapMutations(['SET']),
      handleClick() {
        if (this.type === 'settings') {
          this.SET({type: 'openLogin', items: false})
          this.SET({type: 'openSettings', items: true})
        } else {
          setTimeout(lightdm[this.type], 500);
        }
      }
    },
  }
</script>

<style lang='stylus'>
.system-button
  width 4vmin
  height 4vmin
  max-width 35px
  max-height 35px
  overflow hidden
  svg
    width 100%
    height 100%
</style>
