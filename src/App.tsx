import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/app'
import { PageModule } from '@/store/page'

@Component
export default class MainApp extends Vue {
  async created() {
    PageModule.setTime()
    await AppModule.setUpSettings()
  }

  get bodyClass() {
    return PageModule.bodyClass
  }

  render() {
    return (
      <div id="app" class={ this.bodyClass }>
        <router-view />
      </div>
    )
  }
}
