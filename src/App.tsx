import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/app'
import { CreateElement } from 'vue/types/umd'

@Component
export default class MainApp extends Vue {
  mounted() {
    AppModule.setTime()
    AppModule.setUpSettings()
  }

  render(h: CreateElement) {
    return <div id="app">
      <router-view />
    </div>
  }
}
