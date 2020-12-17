import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'

@Component
export default class SettingsGeneral extends Vue {
  render() {
    return <div class='user-settings-themes'>
      <h2 class="title"> { this.$t('settings.choiceLanguage') } </h2>
    </div>
  }
}
