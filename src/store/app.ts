import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store/index'

import { AppImageTheme, AppSettings, AppTheme, AppThemes, defaultTheme } from '@/models/app'
import { appWindow, LightdmSession, LightdmUsers } from '@/models/lightdm'

const lightdm = appWindow.lightdm

export interface AppState extends AppSettings {
  themes: AppTheme[]
  getMainSettings: AppSettings
  getImage: string | null
  getCurrentTheme: AppTheme | AppImageTheme
  username: string
  desktops: LightdmSession[]
  users: LightdmUsers[]
}

console.log({ lightdm })

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  version = '1.0.4'
  language = 'en'
  languages = []
  loginPosition = 'top'
  currentTheme = 'Space'
  desktop = lightdm.sessions[0].name
  desktops = lightdm.sessions
  defaultColor = '#6BBBED'
  username = lightdm.users[0].username
  users = lightdm.users
  themes = AppThemes

  get getMainSettings(): AppSettings {
    const { language, loginPosition, currentTheme, username, desktop, version, defaultColor } = this
    return { language, loginPosition, currentTheme, username, desktop, version, defaultColor }
  }

  get getImage() {
    const match = this.currentTheme.match(/^image-(.{1,})/)
    return match ? match[1] : null
  }

  get getCurrentTheme() {
    return this.getImage
      ? {
        fullscreen: true,
        src: this.getImage,
        color: { active: this.defaultColor, background: '#1a0532' }
      } as AppImageTheme
      : this.themes.find(({ name }) => name === this.currentTheme) || defaultTheme
  }

  @Mutation
  SET_STATE_APP<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  @Mutation
  SAVE_STATE_APP<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
    localStorage.setItem('settings', JSON.stringify(this.getMainSettings))
  }

  @Action
  async changeTheme(themeName: string) {
    const isExistTheme = this.themes.find(({ name }) => name === themeName)
    const finalTheme = isExistTheme ? themeName || 'image-' + themeName : this.themes[0].name

    this.SAVE_STATE_APP({ key: 'currentTheme', value: finalTheme })

    const { color } = this.getCurrentTheme

    document.documentElement.style
      .setProperty('--color-active', color.active)
    document.documentElement.style
      .setProperty('--color-bg', color.background)
  }

  @Action
  setUpSettings() {
    try {
      let settings: AppSettings = JSON.parse(localStorage.getItem('settings') || '{}')

      if (!Object.keys(settings).length) {
        return
      }

      if (settings.version !== this.version) {
        settings = this.getMainSettings
        localStorage.setItem('settings', JSON.stringify(settings))
      }

      this.changeTheme(settings.currentTheme)

      const isExistDE = lightdm.sessions.find(item => item.name === settings.desktop)

      if (!isExistDE) {
        settings.desktop = lightdm.sessions[0].name
      }

      const isExistUser = lightdm.users.filter(item => item.username === settings.username)

      if (!isExistUser) {
        settings.username = lightdm.users[0].username
      }

      this.SET_STATE_APP({ key: 'loginPosition', value: settings.loginPosition })
      this.SET_STATE_APP({ key: 'desktop', value: settings.desktop })
      this.SET_STATE_APP({ key: 'username', value: settings.username }) // ?
      localStorage.setItem('settings', JSON.stringify(this.getMainSettings))
    } catch {
      localStorage.setItem('settings', JSON.stringify(this.getMainSettings))
      this.setUpSettings()
    }
  }
}

export const AppModule = getModule(App)
