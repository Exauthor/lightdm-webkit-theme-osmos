import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

import BackgroundImage from '@/components/base/BackgroundImage'

@Component({
  components: {
    BackgroundImage
  }
})
export default class HomePage extends Vue {
  render(h: CreateElement) {
    return <div class="index">
      <BackgroundImage></BackgroundImage>
    </div>
  }
}
