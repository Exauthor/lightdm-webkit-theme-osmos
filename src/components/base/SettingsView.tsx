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
  tabs = ['themes', 'theme', 'general']
  activeTab = this.tabs[0]

  get user() {
    return AppModule.currentUser
  }

  get users() {
    return AppModule.users
  }

  activateTab(tab: string) {
    this.activeTab = tab
  }

  render(h: CreateElement) {
    const mapTabs: { [k: string]: any } = {
      general: <SettingsGeneral />,
      themes: <SettingsThemes />,
      theme: <div> theme </div>
    }
    const activeTab = <div key={this.activeTab}> { mapTabs[this.activeTab] } </div>

    return <div class='user-settings'>
      <div class='center-x'>
        <div class='user-settings-tabs'>
          { this.tabs.map((tab) => <div
            class={ `user-settings-tab ${this.activeTab === tab ? 'active' : ''}` }
            onClick={() => this.activateTab(tab)}
          > { tab } </div>) }
        </div>
      </div>
      <div>
        { activeTab }
      </div>
    </div>
  }
}
