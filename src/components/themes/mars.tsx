import { AppModule } from '@/store/app'
import { Component, Vue } from 'vue-property-decorator'
import Parallax from 'parallax-js'

@Component
export default class MarsTheme extends Vue {
  render() {
    return <div
      class="mars"
      ref="scene"
      data-hover-only="true"
      data-friction-x="0.1"
      data-friction-y="0.1"
      data-scalar-x="25"
      data-scalar-y="15"
    >
      <li class="prllx-block" data-depth="0.0">
        <div class="stars"></div>
        <div class="sun">
          <div class="blick center-position"></div>
          <div class="blick center-position"></div>
          <div class="blick center-position"></div>
          <div class="blick center-position"></div>
          <div class="blick center-position"></div>
          <div class="blick center-position"></div>
          <div class="kore"></div>
        </div>
        <div class="planet" onClick={() => AppModule.changeTheme('Osmos')}></div>
      </li>
      <li class="prllx-block" data-depth="0.1">
        <div class="meteor"></div>
      </li>
      <li class="prllx-block" data-depth="0.02">
        <div class="mountain-back"></div>
      </li>
      <li class="prllx-block" data-depth="0.05">
        <div class="mountain-second"></div>
      </li>
      <li class="prllx-block" data-depth="0.08">
        <div class="mountain-front"></div>
      </li>
    </div>
  }

  mounted() {
    const scene = this.$refs.scene as HTMLElement
    if (scene) { const parallax = new Parallax(scene) }
  }
}
