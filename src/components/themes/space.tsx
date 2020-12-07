import { AppModule } from '@/store/app'
import { Component, Vue } from 'vue-property-decorator'
import Parallax from 'parallax-js'

@Component
export default class SpaceTheme extends Vue {
  render() {
    return <div class="space" ref="scene" data-hover-only="true" data-friction-x="0.1" data-friction-y="0.1" data-scalar-x="25" data-scalar-y="15">
      <li class="prllx-block" data-depth="0.0">
        <div class="main-planet center-position"></div>
      </li>
      <li class="prllx-block" data-depth="0.2">
        <div class="ufo"></div>
      </li>
      <li class="prllx-block" data-depth="0.1">
        <div class="meteor"></div>
      </li>
      <li class="prllx-block" data-depth="0.07">
        <div class="hole"></div>
      </li>
      <li class="prllx-block" data-depth="0.02">
        <div class="another-planet"></div>
      </li>
    </div>
  }

  mounted() {
    const scene = this.$refs.scene as HTMLElement
    if (scene) { const parallax = new Parallax(scene) }
  }
}
