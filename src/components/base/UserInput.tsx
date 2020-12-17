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

  render() {
    return <div class='user-input'>
      <div class='empty-button'>
      </div>
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
