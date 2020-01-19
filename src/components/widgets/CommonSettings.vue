<template lang='pug'>
  .widget-block
    .widget-mono
      h3 {{ $t('settings.language') }}:
      SelectItem(
        name='language'
        interactiveBlock='language'
        :items='languages'
        :value='language'
        :actions='actions'
      )
    .widget-mono
      h3 {{ $t('settings.choiceLoginPosition.title') }}:
      SelectItem(
        name='loginPosition'
        interactiveBlock='loginPosition'
        :items='positionArrayValues'
        :value='$t(`settings.choiceLoginPosition.${loginPosition}`)'
        :actions=`[
          {
            type: 'commit',
            on: 'change',
            key: 'loginPosition',
            path: 'settings/CHANGE_SETTINGS'
          }
        ]`
      )  
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CommonSettingsWidget',  
  data() {
    return {
      actions: []
    }
  },
  computed: {
    ...mapState('settings', ['themes', 'language', 'languages', 'loginPosition']),
    ...mapGetters('settings', ['getCurrentDesktop']),
    positionArrayValues() {
      const position = ['left', 'bottom', 'top', 'right']
      const pre = 'settings.choiceLoginPosition.'
      return position.map(position => ({ text: this.$t(pre + position), value: position }))
    },
  },
  mounted() {
    this.actions.push({
      type: 'commit',
      on: 'change',
      key: this, 
      path: 'settings/CHANGE_LANGUAGE'
    })
  },
};
</script>

<style lang='stylus'>
.widget-mono
  width 100%
  display flex
  align-items center
  justify-content center
  .selection
    margin-left 10px
    margin-bottom 5px
    width 100%
</style>
