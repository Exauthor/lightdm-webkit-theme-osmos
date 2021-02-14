import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import AppIcon from '@/components/app/AppIcon.vue'
import SettingsThemes from '@/components/base/SettingsThemes'
import SettingsCustom from '@/components/base/SettingsCustom'
import SettingsGeneral from '@/components/base/SettingsGeneral'
import { PageModule } from '@/store/page'

@Component({
  components: {
    AppIcon,
    SettingsThemes,
    SettingsCustom,
    SettingsGeneral
  }
})
export default class SettingsView extends Vue {
  get mainTabIndex() {
    return PageModule.mainTabIndex
  }

  get user() {
    return AppModule.currentUser
  }

  get users() {
    return AppModule.users
  }

  render() {
    const mapTabs = [<SettingsThemes />, <SettingsGeneral />]
    const hasThemeSettings = AppModule.activeTheme?.settings?.length !== undefined

    if (hasThemeSettings) {
      mapTabs.splice(1, 0, <SettingsCustom />)
    }

    const activeTab = <div key={this.mainTabIndex}> { mapTabs[this.mainTabIndex] } </div>

    return <div class='user-settings'>
      { activeTab }
    </div>
  }
}
