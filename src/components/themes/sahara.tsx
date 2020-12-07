import { Component, Vue } from 'vue-property-decorator'
import Parallax from 'parallax-js'

@Component
export default class SaharaTheme extends Vue {
  render() {
    return <div class="sahara" ref="scene" data-hover-only="true" data-friction-x="1" data-friction-y="0" data-scalar-x="25" data-scalar-y="15">
      <li class="prllx-block" data-depth="0.0">
        <div class="stars"></div>
      </li>
      <li class="prllx-block" data-depth="0.02">
        <div class="pyramids"></div>
      </li>
      <li class="prllx-block" data-depth="0.1">
        <div class="rocket"></div>
      </li>
      <li class="prllx-block" data-depth="0.2">
        <div class="sand"></div>
      </li>
      <li class="prllx-block" data-depth="0.1">
        <div class="sand-second"></div>
      </li>
    </div>
  }

  mounted() {
    const scene = this.$refs.scene as HTMLElement
    if (scene) { const parallax = new Parallax(scene) }
  }
}
