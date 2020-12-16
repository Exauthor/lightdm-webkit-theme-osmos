import { Component, Vue } from 'vue-property-decorator'

import { AppTheme } from '@/models/app'
import { AppModule } from '@/store/app'
import { PageModule } from '@/store/page'

import AppIcon from '@/components/app/AppIcon.vue'
import UserAvatar from '@/components/base/UserAvatar'
import UserInput from '@/components/base/UserInput'
import SettingsView from '@/components/base/SettingsView'
import { prevent } from '@/utils/jsx'

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

  get activeBlock() {
    return PageModule.activeBlock
  }

  get isOpenLogin() {
    return PageModule.isOpenBlock('login')
  }

  get isOpenSettings() {
    return PageModule.isOpenBlock('settings')
  }

  get isOpen() {
    return this.isOpenLogin || this.isOpenSettings
  }

  handleClickOutside() {
    PageModule.closeBlock()
  }

  openSettings(event: MouseEvent) {
    console.log({ event })
    event.preventDefault()
    event.stopPropagation()

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
      class={ `settings-button block-${this.activeBlock?.id}` }
      onClick={this.openSettings}
    >
      <AppIcon name='settings'/>
    </button>
    const loginContent = this.isOpenLogin
      ? <UserInput />
      : <SettingsView />

    const loginView = this.isOpen ? <div
      key="contextAnimation"
      class={ { [`block-${this.activeBlock?.id}`]: true, 'login-content-settings': this.isOpenSettings }}
    >
      <div class='login-view'>
        <UserAvatar />
        <transition name='fade-content'>
          { this.viewContent ? loginContent : null }
        </transition>
      </div>
      { toggleViewButton }
    </div> : null

    const emptyView = !this.isOpen ? <div key="emptyAnimation">
      <h2 class="login-empty-title"> { this.$t('text.emptyPage') } </h2>
    </div> : null

    return <transition-group class="login-transition" name='fade' tag="div">
      { loginView }
      { emptyView }
    </transition-group>
  }
}
