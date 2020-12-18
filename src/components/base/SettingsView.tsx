import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import AppIcon from '@/components/app/AppIcon.vue'
import SettingsThemes from '@/components/base/SettingsThemes'
import SettingsGeneral from '@/components/base/SettingsGeneral'
import { CreateElement } from 'vue/types/umd'

@Component({
  components: {
    AppIcon,
    SettingsThemes,
    SettingsGeneral
  }
})
export default class SettingsView extends Vue {
  activeTabIndex = 0

  get tabs() {
    return [this.$t('settings.choiceThemes'), this.$t('settings.customizeTheme'), this.$t('settings.general')]
  }

  get user() {
    return AppModule.currentUser
  }

  get users() {
    return AppModule.users
  }

  activateTab(tabIndex: number) {
    this.activeTabIndex = tabIndex
  }

  render(h: CreateElement) {
    const mapTabs = [<SettingsThemes />, <div> theme </div>, <SettingsGeneral />]
    const activeTab = <div key={this.tabs[this.activeTabIndex]}> { mapTabs[this.activeTabIndex] } </div>

    return <div class='user-settings'>
      <div class='center-x'>
        <div class='user-settings-tabs'>
          { this.tabs.map((tab, index) => <div
            class={ `user-settings-tab ${this.activeTabIndex === index ? 'active' : ''}` }
            onClick={() => this.activateTab(index)}
          > { tab } </div>) }
        </div>
      </div>
      <div>
        { activeTab }
      </div>
    </div>
  }
}
