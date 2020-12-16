import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import AppIcon from '@/components/app/AppIcon.vue'
import { PageModule } from '@/store/page'

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

  openSettings(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    PageModule.openBlock({ id: 'settings' })

    this.$emit('updateView', false)

    setTimeout(() => {
      this.$emit('updateView', true)
    }, 300)
  }

  render() {
    return <div class='user-input'>
      <button
        class='settings-button'
        onClick={this.openSettings}
      >
        <AppIcon name='settings'/>
      </button>
      <input
        id='password'
        // @keyup='handleKeyup'
        type='password'
        ref='password'
        placeholder={ this.$t('text.password') }
        // v-model='initPassword'
        readonly={this.logging}
        // class={{ 'error': this.error }}
      />
      <button
        class='user-input-login'
      > <AppIcon name='arrow' /> </button>
      {/* </button> */}
    </div>
  }
}
