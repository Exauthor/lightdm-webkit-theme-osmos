import { Component, Vue } from 'vue-property-decorator'
import Parallax from 'parallax-js'

@Component
export default class OsmosTheme extends Vue {
  render() {
    return (
      <div
        class="osmos"
        ref="scene"
        data-hover-only="true"
        data-friction-x="0.1"
        data-friction-y="0.1"
        data-scalar-x="25"
        data-scalar-y="15"
      >
        <li class="prllx-block" data-depth="0.0">
          <div class="stars"></div>
        </li>
        <li class="prllx-block" data-depth="0.0">
          <div class="sun"></div>
        </li>
        <li class="prllx-block" data-depth="0.1">
          <div class="clouds">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="clouds-reflex">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </li>
        <li class="prllx-block" data-depth="0.0">
          <div class="sea">
            <div class="rocks">
              <div class="rocks_left">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div class="rocks_right">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </li>
      </div>
    )
  }

  mounted() {
    const scene = this.$refs.scene as HTMLElement
    if (scene) { const parallax = new Parallax(scene) }
  }
}
