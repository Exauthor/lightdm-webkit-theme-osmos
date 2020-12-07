import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'

@Component
export default class SettingsThemes extends Vue {
  get themes() {
    return AppModule.themes
  }

  setImage(name: string) {
    let url

    try {
      url = require(`@/assets/images/themes/${name}/index.png`)
    } catch {
      url = 'notFound'
    }

    return url
  }

  changeTheme(theme: string) {
    AppModule.changeTheme(theme)
  }

  render() {
    return <div class='user-settings-themes'>
      { this.themes.map(theme => <div
        class='user-settings-theme'
        onClick={() => this.changeTheme(theme.name)}
        style={`background: url(${this.setImage(theme.name.toLowerCase())}) no-repeat center/cover`}
      >
      </div>) }
    </div>
  }
}
