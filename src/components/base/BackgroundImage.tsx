import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

import { AppTheme } from '@/models/app'
import { AppModule } from '@/store/app'

import sphere from '@/components/themes/sphere.vue'
import fire from '@/components/themes/fire.tsx'
import mars from '@/components/themes/mars.tsx'
import osmos from '@/components/themes/osmos'
// import fluid from '@/components/themes/fluid'
// import neon from '@/components/themes/neon'
import space from '@/components/themes/space'
import sahara from '@/components/themes/sahara'
import malevich from '@/components/themes/malevich'
// import timeComponent from '@/components/themes/time'
// import polygonComponent from '@/components/themes/polygon'

@Component({
  components: {
    fire,
    mars,
    osmos,
    // neon,
    space,
    // fluid,
    sahara,
    malevich
    // timeComponent,
    // polygonComponent
  }
})
export default class BackgroundImage extends Vue {
  get theme() {
    return AppModule.getCurrentTheme as AppTheme
  }

  get image() {
    return AppModule.getImage
  }

  get classObject() {
    return {
      'background-image': true,
      [`background-${AppModule.loginPosition}`]: true && this.isOpenLogin,
      'background-fullscreen': this.theme.fullscreen || !this.isOpenLogin
    }
  }

  get isOpenLogin() {
    return true
    // return this.isOpenBlock('login')
  }

  render(h: CreateElement) {
    const component: { [k: string]: any } = {
      fire: h(fire),
      mars: h(mars),
      osmos: h(osmos),
      space: h(space),
      sahara: h(sahara),
      malevich: h(malevich)
    }
    const body = this.image ? (
      <div class="background" style={`background-image: url(${this.image})`} />
    ) : component[this.theme.component] || h(fire)

    return <div class={this.classObject}>{body}</div>
  }
}
