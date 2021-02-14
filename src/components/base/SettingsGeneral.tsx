import { Component, Vue } from 'vue-property-decorator'

import AppSelector from '@/components/app/AppSelector'
import AppCheckbox from '@/components/app/AppCheckbox'
import { PageModule } from '@/store/page'
import { LoginPosition } from '@/models/page'
import { AppModule } from '@/store/app'

const osList = [
  {
    text: 'Arch Linux',
    value: 'arch-linux',
    icon: 'arch-linux'
  },
  {
    text: 'Ubuntu',
    value: 'ubuntu',
    icon: 'ubuntu'
  },
  {
    text: 'Fedora',
    value: 'fedora',
    icon: 'fedora'
  },
  {
    text: 'Linux Mint',
    value: 'linux-mint',
    icon: 'linux-mint'
  },
  {
    text: 'Gentoo',
    value: 'gentoo',
    icon: 'gentoo'
  }
]

@Component({ components: { AppSelector } })
export default class SettingsGeneral extends Vue {
  get menuPositionItems() {
    const positions = ['top', 'left', 'right', 'bottom', 'center']
    return positions.map(word => { return { value: word, text: this.$t(`settings.login-position.${word}`) } })
  }

  get bodyClass() {
    return AppModule.bodyClass
  }

  get users() {
    return AppModule.users
  }

  render() {
    return <div class='user-settings-general'>
      <div>
        <h2 class="title"> { this.$t('settings.performance') } </h2>
        <div class="grid-two">
          <AppCheckbox
            {...{
              props: {
                label: 'Blur',
                value: this.bodyClass.blur
              },
              on: {
                input: (value: boolean) => {
                  AppModule.CHANGE_BODY_CLASS({ key: 'blur', value })
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
                  AppModule.CHANGE_BODY_CLASS({ key: 'no-transition', value })
                }
              }
            }}
          />
        </div>
      </div>
      <div class="grid-two">
        <AppSelector { ...{
          props: {
            label: this.$t('settings.choice-language').toString(),
            items: PageModule.languages.map((language) => ({
              text: language,
              value: language
            })),
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
            label: this.$t('settings.choice-language').toString(),
            items: this.menuPositionItems,
            value: { value: PageModule.loginPosition, text: this.$t(`settings.login-position.${PageModule.loginPosition}`) }
          },
          on: {
            input: (value: LoginPosition) => {
              localStorage.setItem('loginPosition', value)
              PageModule.SET_STATE_PAGE({ key: 'loginPosition', value })
            }
          }
        } } />
        <AppSelector { ...{
          props: {
            label: this.$t('settings.choice-desktop').toString(),
            items: AppModule.desktops.map((desktop) => ({
              text: desktop.name,
              value: desktop.key,
              icon: desktop.key
            })),
            value: AppModule.currentDesktop?.key
          },
          on: {
            input: (value: string) => {
              AppModule.SAVE_STATE_APP({ key: 'desktop', value })
            }
          }
        } } />
        <AppSelector { ...{
          props: {
            label: this.$t('settings.choice-os').toString(),
            items: osList,
            value: AppModule.currentOs
          },
          on: {
            input: (value: string) => {
              AppModule.SAVE_STATE_APP({ key: 'currentOs', value })
            }
          }
        } } />
        <AppSelector { ...{
          props: {
            label: this.$t('settings.choice-user').toString(),
            items: this.users.map(user => ({ text: user.display_name, value: user.username, icon: user.image })),
            value: AppModule.username
          },
          on: {
            input: (value: string) => {
              AppModule.SAVE_STATE_APP({ key: 'username', value })
            }
          }
        } } />
      </div>
    </div>
  }
}
