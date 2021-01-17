import { Component, Vue } from 'vue-property-decorator'

import AppSelector from '@/components/app/AppSelector'
import AppCheckbox from '@/components/app/AppCheckbox'
import { PageModule } from '@/store/page'
import { LoginPosition } from '@/models/page'

@Component({ components: { AppSelector } })
export default class SettingsGeneral extends Vue {
  get menuPositionItems() {
    const positions = ['top', 'left', 'right', 'bottom', 'center']
    return positions.map(word => { return { value: word, text: this.$t(`settings.loginPosition.${word}`) } })
  }

  get bodyClass() {
    return PageModule.bodyClass
  }

  render() {
    return <div class='user-settings-general'>
      <div>
        <h2 class="title"> { this.$t('settings.performance') } </h2>
        <AppCheckbox
          {...{
            props: {
              label: 'Blur',
              value: this.bodyClass.blur
            },
            on: {
              input: (value: boolean) => {
                PageModule.CHANGE_BODY_CLASS({ key: 'blur', value })
              }
            }
          }}
        ></AppCheckbox>
        <AppCheckbox
          {...{
            props: {
              label: 'Disable animation',
              value: this.bodyClass['no-transition']
            },
            on: {
              input: (value: boolean) => {
                PageModule.CHANGE_BODY_CLASS({ key: 'no-transition', value })
              }
            }
          }}
        />
      </div>
      <div class="grid-three">
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
        <AppSelector { ...{
          props: {
            label: this.$t('settings.choiceLanguage').toString(),
            items: this.menuPositionItems,
            value: { value: PageModule.loginPosition, text: this.$t(`settings.loginPosition.${PageModule.loginPosition}`) }
          },
          on: {
            input: (value: LoginPosition) => {
              localStorage.setItem('loginPosition', value)
              PageModule.SET_STATE_PAGE({ key: 'loginPosition', value })
            }
          }
        } } />
      </div>
    </div>
  }
}
