import { Component, Vue } from 'vue-property-decorator'
import BackgroundImage from '@/components/base/BackgroundImage'
import LoginComponent from '@/components/base/LoginComponent'
import { PageModule } from '@/store/page'

@Component({
  components: {
    BackgroundImage
  }
})
export default class HomePage extends Vue {
  render() {
    return (
      <div class="index">
        <LoginComponent />
        <BackgroundImage />
      </div>
    )
  }

  mounted() {
    PageModule.openBlock({ id: 'settings' })
  }
}
