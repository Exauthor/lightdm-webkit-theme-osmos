<template lang='pug'>
  .widget-block
    .widget-mono
      h3 {{ $t('settings.language') }}:
      SelectItem(
        name='language'
        :items='languages'
        :value='language'
        :callback='handleChangeLanguage'
      )
    .widget-mono
      h3 {{ $t('settings.choiceLoginPosition.title') }}:
      SelectItem(
        name='loginPosition'
        :items='positionArrayValues'
        :value='$t(`settings.choiceLoginPosition.${loginPosition || "right"}`)'
        :callback='handleChangeMenuView'
      )  
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommonSettingsWidget',  
  data() {
    return {
      actions: []
    }
  },
  computed: {
    ...mapState('settings', ['themes', 'language', 'languages', 'loginPosition']),
    positionArrayValues() {
      const position = ['left', 'bottom', 'top', 'right']
      const pre = 'settings.choiceLoginPosition.'
      return position.map(position => ({ text: this.$t(pre + position), value: position }))
    },
  },
  methods: {
    ...mapActions('settings', ['changeLanguage', 'updatePosition']),
    handleChangeLanguage(item) {
      this.changeLanguage({ key: this, value: item })
    },
    handleChangeMenuView(item) {
      this.updatePosition(item.value)
    }
  },
};
</script>

<style lang='stylus'>
.widget-mono
  width max-content
  display flex
  align-items center
  justify-content center
  .selection
    margin-left 10px
    margin-bottom 5px
    width 100%
</style>
