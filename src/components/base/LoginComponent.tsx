import { Component, Vue } from 'vue-property-decorator'

import { AppTheme } from '@/models/app'
import { AppModule } from '@/store/app'
import { PageModule } from '@/store/page'

import AppIcon from '@/components/app/AppIcon.vue'
import UserAvatar from '@/components/base/UserAvatar'
import UserInput from '@/components/base/UserInput'
import SettingsView from '@/components/base/SettingsView'

@Component({
  components: {
    AppIcon,
    UserInput,
    UserAvatar,
    SettingsView
  }
})
export default class LoginComponent extends Vue {
  viewContent = true

  get theme() {
    return AppModule.getCurrentTheme as AppTheme
  }

  get image() {
    return AppModule.getImage
  }

  get classObject() {
    return {
      'login-menu': true
    }
  }

  get isOpen() {
    return this.isOpenLogin || this.isOpenSettings
  }

  get isOpenLogin() {
    return PageModule.isOpenBlock('login')
  }

  get isOpenSettings() {
    return PageModule.isOpenBlock('settings')
  }

  openSettings() {
    if (this.isOpenLogin) {
      PageModule.openBlock({ id: 'settings' })
    } else {
      PageModule.openBlock({ id: 'login' })
    }
    this.viewContent = false

    setTimeout(() => {
      this.viewContent = true
    }, 300)
  }

  render() {
    const toggleViewButton = <button
      class='settings-button'
      onClick={this.openSettings}
    >
      <AppIcon name='settings'/>
    </button>
    const loginWrapper = (child: any) => {
      return <div class='login-view'>
        <UserAvatar />
        <transition name='fade-content'>
          { this.viewContent ? child : null }
        </transition>
      </div>
    }

    const loginView = this.isOpenLogin
      ? <UserInput />
      : <SettingsView />

    const blockWrapper = this.isOpen ? <div class={ { 'login-content': true, 'login-content-settings': this.isOpenSettings } }>
      { loginWrapper(loginView) }
      { toggleViewButton }
    </div> : null

    return <transition name='fade'>
      { blockWrapper }
    </transition>
  }
}
