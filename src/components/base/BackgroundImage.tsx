import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

import { AppTheme } from '@/models/app'
import { AppModule } from '@/store/app'

import dna from '@/components/themes/DNA'
import sky from '@/components/themes/sky'
import fire from '@/components/themes/fire'
import blob from '@/components/themes/blob'
import mars from '@/components/themes/mars'
import time from '@/components/themes/time'
import flow from '@/components/themes/flow'
import neon from '@/components/themes/neon.vue'
import osmos from '@/components/themes/osmos'
import waves from '@/components/themes/waves'
import fluid from '@/components/themes/fluid.vue'
import space from '@/components/themes/space'
import malevich from '@/components/themes/malevich'
import infinity from '@/components/themes/infinity'

import { PageModule } from '@/store/page'

@Component({
  components: {
    timeTheme: time,
    sky,
    fire,
    blob,
    flow,
    mars,
    osmos,
    neon,
    space,
    waves,
    fluid,
    malevich,
    infinity
  }
})
export default class BackgroundImage extends Vue {
  get theme() {
    return AppModule.activeTheme
  }

  get image() {
    return AppModule.getImage
  }

  get classObject() {
    return {
      'background-image': true,
      'background-fullscreen': this.theme.fullscreen || !this.isOpenLogin
    }
  }

  get isOpenLogin() {
    return PageModule.isOpenBlock('login')
  }

  render(h: CreateElement) {
    const component: { [k: string]: any } = {
      dna: h(dna),
      sky: h(sky),
      fire: h(fire),
      time: h(time),
      blob: h(blob),
      flow: h(flow),
      mars: h(mars),
      neon: h(neon),
      osmos: h(osmos),
      waves: h(waves),
      fluid: h(fluid),
      space: h(space),
      infinity: h(infinity),
      malevich: h(malevich)
    }
    const body = this.image ? (
      <div class="background" style={`background-image: url(${this.image})`} />
    ) : component[this.theme.component ?? ''] || h(fire)

    return <div class={this.classObject}>{body}</div>
  }
}
