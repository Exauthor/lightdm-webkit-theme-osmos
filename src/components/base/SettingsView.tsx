import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import AppIcon from '@/components/app/AppIcon.vue'
import SettingsThemes from '@/components/base/SettingsThemes'

@Component({
  components: {
    AppIcon,
    SettingsThemes
  }
})
export default class SettingsView extends Vue {
  tabs = ['users', 'themes', 'settings']

  get user() {
    return AppModule.currentUser
  }

  get users() {
    return AppModule.users
  }

  render() {
    return <div class='user-settings'>
      <div class='center-x'>
        <div class='user-settings-tabs'>
          { this.tabs.map(tab => <div class='user-settings-tab'> { tab } </div>) }
        </div>
      </div>
      <SettingsThemes />
    </div>
  }
}
