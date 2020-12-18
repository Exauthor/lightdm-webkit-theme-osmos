import { Component, Vue } from 'vue-property-decorator'

import AppSelector from '@/components/app/AppSelector'
import { PageModule } from '@/store/page'
import { LoginPosition } from '@/models/page'

@Component({ components: { AppSelector } })
export default class SettingsGeneral extends Vue {
  render() {
    return <div class='user-settings-general'>
      <AppSelector { ...{
        props: {
          label: this.$t('settings.choiceLanguage').toString(),
          items: PageModule.languages,
          value: PageModule.language
        },
        on: {
          input: (value: string) => {
            this.$i18n.locale = value
            localStorage.setItem('language', value)
            PageModule.SET_STATE_PAGE({ key: 'language', value })
          }
        }
      } } />
    </div>
  }
}
