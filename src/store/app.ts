import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import store from '@/store/index'

import {
  AppImageTheme,
  AppInputTheme,
  AppInputThemeValue,
  AppSettings,
  AppTheme,
  AppThemes,
  defaultTheme
} from '@/models/app'
import { appWindow, LightdmSession, LightdmUsers } from '@/models/lightdm'

export interface AppState extends AppSettings {
  themes: AppTheme[];
  getMainSettings: AppSettings;
  getImage: string | null;
  activeTheme: AppTheme | AppImageTheme;
  username: string;
  desktops: LightdmSession[];
  users: LightdmUsers[];
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  version = '2.0.0'
  currentTheme = ''
  currentOs = 'arch-linux'
  desktop = appWindow?.lightdm?.sessions[0].key || 'i3'
  desktops = appWindow?.lightdm?.sessions || []
  defaultColor = '#6BBBED'
  username = appWindow?.lightdm?.users[0].username || 'User name'
  users = appWindow?.lightdm?.users || []
  themes = AppThemes
  password = ''
  bodyClass: Record<string, boolean> = {
    blur: true,
    'no-transition': false
  }

  get getMainSettings(): AppSettings {
    const {
      themes,
      desktop,
      version,
      username,
      bodyClass,
      currentOs,
      currentTheme,
      defaultColor
    } = this

    return {
      themes,
      desktop,
      version,
      username,
      bodyClass,
      currentOs,
      currentTheme,
      defaultColor
    }
  }

  get getImage() {
    const match = this.currentTheme.match(/^image-(.{1,})/)
    return match ? match[1] : null
  }

  get activeTheme(): AppTheme | AppImageTheme {
    return this.getImage !== null
      ? ({
        fullscreen: true,
        src: this.getImage,
        color: { active: this.defaultColor, background: '#1a0532' }
      } as AppImageTheme)
      : this.themes.find(({ name }) => name === this.currentTheme) ||
          defaultTheme
  }

  get currentUser() {
    return this.users.find(({ username }) => username === this.username)
  }

  get getThemeSettings() {
    return (name: string) => {
      if (this.getImage) return null

      return (this.activeTheme as AppTheme).settings?.find(input => input.name === name)
    }
  }

  get currentDesktop() {
    return this.desktops.find(({ key }) => key === this.desktop)
  }

  @Mutation
  SET_STATE_APP<S extends this, K extends keyof this>({ key, value }: { key: K; value: S[K] }) {
    this[key] = value
  }

  @Mutation
  SAVE_STATE_APP<S extends this, K extends keyof this>({ key, value }: { key: K; value: S[K] }) {
    this[key] = value

    const settings = JSON.parse(localStorage.getItem('settings') || '')
    settings[key] = value
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  @Mutation
  CHANGE_BODY_CLASS({ key, value }: { key: string; value: boolean }) {
    this.bodyClass[key] = value

    const settings = JSON.parse(localStorage.getItem('settings') || '')
    settings.bodyClass = this.bodyClass
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  @Mutation
  CHANGE_THEME_INPUT({ input, value }: { input: AppInputTheme; value: AppInputThemeValue }) {
    input.value = value
  }

  @Action
  changeSettingsThemeInput({ key, value }: { key: string; value: AppInputThemeValue }) {
    const inputs = (this.activeTheme as AppTheme).settings || []
    const input = inputs?.find(input => input.name === key)

    if (input) {
      this.CHANGE_THEME_INPUT({ input, value })

      const settings = JSON.parse(localStorage.getItem('settings') || '{}')
      settings.themes = this.themes
      localStorage.setItem('settings', JSON.stringify(this.getMainSettings))
    }
  }

  @Action
  async changeTheme(themeName: string) {
    const isExistTheme = this.themes.find(({ name }) => name === themeName)
    const finalTheme = isExistTheme
      ? themeName || 'image-' + themeName
      : this.themes[0].name

    this.SET_STATE_APP({ key: 'currentTheme', value: finalTheme })
    localStorage.setItem('settings', JSON.stringify(this.getMainSettings))

    const { color } = this.activeTheme
    let activeColor = color.active

    if (this.activeTheme.settings) {
      const activeColorInput = this.activeTheme.settings.find(({ name }) => name === 'activeColor')
      if (activeColorInput) {
        activeColor = activeColorInput.value + ''
      }
    }

    document.documentElement.style.setProperty('--color-active', activeColor)
    document.documentElement.style.setProperty('--color-bg', color.background)
  }

  @Action
  login() {
    console.log('Start login')
    // setTimeout(() => {
    appWindow.lightdm_login(this.username, this.password, () => {
      console.log('FINISH LOGIN?!')
      appWindow.lightdm_start(this.currentDesktop?.key || appWindow?.lightdm?.sessions[0].key || 'i3')
    }, (error) => {
      console.log(`error AUTH ${error}`)
    })
    // }, 100)
  }

  @Action
  setUpSettings() {
    try {
      let settings: AppSettings = JSON.parse(
        localStorage.getItem('settings') || '{}'
      )

      if (!Object.keys(settings).length) {
        localStorage.setItem('settings', JSON.stringify(this.getMainSettings))
        return
      }

      if (settings.version !== this.version) {
        settings = this.getMainSettings
        localStorage.setItem('settings', JSON.stringify(settings))
      }

      if (settings.themes) {
        const syncTheme = this.themes.reduce((themes: AppTheme[], theme) => {
          const cachedTheme = settings.themes.find(({ name }) => name === theme.name)

          if (cachedTheme && cachedTheme?.settings !== null) {
            theme.settings = theme.settings?.map(input => {
              const themeInput = cachedTheme.settings?.find(({ name }) => name === input.name)

              return Object.assign(input, { value: themeInput?.value ?? input.value })
            })
          }
          themes.push(theme)

          return themes
        }, [])

        this.SET_STATE_APP({ key: 'themes', value: syncTheme })
      }

      this.changeTheme(settings.currentTheme)

      const isExistDE = appWindow?.lightdm?.sessions.find(({ key }) => key === settings.desktop)

      if (isExistDE === undefined) {
        settings.desktop = appWindow?.lightdm?.sessions[0].key || 'i3'
      }

      if (settings.bodyClass) {
        this.SET_STATE_APP({ key: 'bodyClass', value: settings.bodyClass })
      }

      const isExistUser = appWindow?.lightdm?.users.find(({ username }) => username === settings.username)

      if (isExistUser === undefined) {
        settings.username = appWindow?.lightdm?.users[0].username || 'Tyler'
      }

      this.SET_STATE_APP({ key: 'currentOs', value: settings.currentOs || 'arch-linux' })
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
