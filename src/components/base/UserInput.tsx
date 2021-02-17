import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: { AppIcon }
})
export default class UserInput extends Vue {
  logging = false

  get user() {
    return AppModule.currentUser
  }

  get users() {
    return AppModule.users
  }

  get passwordValue() {
    return AppModule.password
  }

  login() {
    AppModule.login()
  }

  handleKeyup(event: InputEvent) {
    AppModule.SET_STATE_APP({ key: 'password', value: (event.target as HTMLInputElement)?.value || '' })
  }

  render() {
    return <div class='user-input'>
      <div class='empty-button'>
      </div>
      <input
        id='password'
        type='password'
        name='password'
        autocomplete='on'
        ref='password'
        placeholder={ this.$t('text.password') }
        onKeyup={this.handleKeyup}
        value={this.passwordValue}
        readonly={this.logging}
      />
      <button
        class='user-input-login'
        onClick={this.login}
      > <AppIcon name='arrow' /> </button>
    </div>
  }
}
