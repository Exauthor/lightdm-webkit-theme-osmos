import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/app'
import { PageModule } from '@/store/page'

@Component
export default class MainApp extends Vue {
  created() {
    PageModule.setTime()
    AppModule.setUpSettings()

    const interactiveBlocks = [
      {
        id: 'login',
        closeBeforeMount: ['settings']
      },
      {
        id: 'settings',
        closeBeforeMount: ['login']
      }
    ]

    PageModule.SET_STATE_PAGE({ key: 'interactiveBlocks', value: interactiveBlocks })
  }

  render() {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  }
}
