import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import AppIcon from '@/components/app/AppIcon.vue'
import SettingsThemes from '@/components/base/SettingsThemes'
import { CreateElement } from 'vue/types/umd'

@Component({
  components: {
    AppIcon,
    SettingsThemes
  }
})
export default class SettingsView extends Vue {
  tabs = ['themes', 'users', 'settings']
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
      users: <div> Users </div>,
      themes: <SettingsThemes />,
      settings: <div> Settigs </div>
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
      <transition-group name="fade-page" tag="div">
        { activeTab }
      </transition-group>
    </div>
  }
}
