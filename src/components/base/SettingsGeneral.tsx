import { Component, Vue } from 'vue-property-decorator'

import AppSelector from '@/components/app/AppSelector'
import { PageModule } from '@/store/page'

@Component({ components: { AppSelector } })
export default class SettingsGeneral extends Vue {
  get locales() {
    return PageModule.languages
  }

  render() {
    return <div class='user-settings-general'>
      <AppSelector { ...{
        props: {
          label: this.$t('settings.choiceLanguage').toString(),
          items: this.locales
        }
      } } />
    </div>
  }
}
