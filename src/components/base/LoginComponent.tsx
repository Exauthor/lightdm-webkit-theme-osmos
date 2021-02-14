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
    return AppModule.activeTheme
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

  get currentDesktop() {
    return AppModule.currentDesktop
  }

  get bodyClass() {
    return AppModule.bodyClass
  }

  get mainTabIndex() {
    return PageModule.mainTabIndex
  }

  get tabs() {
    const tabs = [this.$t('settings.choice-themes'), this.$t('settings.general')]
    const hasThemeSettings = AppModule.activeTheme?.settings?.length !== undefined

    if (hasThemeSettings) {
      tabs.splice(1, 0, this.$t('settings.customize-theme'))
    }

    return tabs
  }

  activateTab(index: number) {
    PageModule.SET_STATE_PAGE({ key: 'mainTabIndex', value: index })
  }

  openSettings(event: Event) {
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
    }, this.bodyClass['no-transition'] ? 0 : 300)
  }

  render() {
    const tabs = <div class='user-settings-tabs'>
      { this.tabs.map((tab, index) => <div
        class={ `user-settings-tab ${this.mainTabIndex === index ? 'active' : ''}` }
        onClick={() => this.activateTab(index)}
      > { tab } </div>) }
    </div>

    const nativeOn = {
      click: (event: Event) => {
        this.openSettings(event)
        PageModule.openTab({ type: 'settings' })
      }
    }

    const loginContent = this.isOpenLogin
      ? <UserInput />
      : <SettingsView />

    const loginView = this.isOpen ? <div
      key="contextAnimation"
      class={ { [`block-${this.activeBlock?.id}`]: true, 'login-content-settings': this.isOpenSettings }}
    >
      <div class={ ['login-view', `login-view--${PageModule.loginPosition}`] }>
        <AppIcon {...{
          props: { name: this.currentDesktop?.key },
          nativeOn,
          class: `desktop-icon ${this.isOpenLogin ? '' : 'o-0'}`
        }} />
        <AppIcon {...{
          props: { name: 'collapse' },
          class: `system-icon ${this.isOpenLogin ? 'o-0' : ''}`
        }} />
        <AppIcon {...{
          props: { name: AppModule.currentOs },
          nativeOn,
          class: `system-icon ${this.isOpenLogin ? '' : 'o-0'}`
        }} />

        <UserAvatar />

        { this.isOpenLogin ? null : tabs }

        <button
          class='settings-button'
          onClick={this.openSettings}
        >
          <AppIcon name='settings'/>
        </button>
        <transition name='fade-content'>
          { this.viewContent ? loginContent : null }
        </transition>
      </div>
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
