import { AppModule } from '@/store/app'
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

@Component
export default class FireTheme extends Vue {
  render() {
    return <div class="fire center-position"></div>
  }
}
