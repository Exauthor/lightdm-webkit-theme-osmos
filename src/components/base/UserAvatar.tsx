import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: { AppIcon }
})
export default class UserAvatar extends Vue {
  get user() {
    return AppModule.currentUser
  }

  get password() {
    return AppModule.password
  }

  get users() {
    return AppModule.users
  }

  render() {
    const avatar = this.user?.image
      ? <div
        class='user-avatar'
        style={ { 'background-image': `url("${this.user.image}")` } }
      />
      : <AppIcon name='user'/>

    return <div class='user-choice'>
      { avatar }
      <div class='user-name' onClick={ () => { throw Error('123') }}> { this.user?.display_name } </div>
      <div> { this.password } </div>
    </div>
  }
}
