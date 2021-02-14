import { Component, Vue } from 'vue-property-decorator'
import Parallax from 'parallax-js'
import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: {
    AppIcon
  }
})
export default class MalevichTheme extends Vue {
  render() {
    return <div class="malevich" ref="scene" data-hover-only="true" data-friction-x="0.1" data-friction-y="0.1" data-scalar-x="25" data-scalar-y="15">
      <li class="prllx-block" data-depth="0.0">
        <div class="parralax-item-cube center-position"></div>
      </li>
      <li class="prllx-block" data-depth="0.05">
        <div class="parralax-item-bottom-left">
          <AppIcon name="malevich-bottom-left"/>
        </div>
        <div class="parralax-item-bottom-right">
          <AppIcon name="malevich-bottom-right"/>
        </div>
        <div class="parralax-item-top-right">
          <AppIcon name="malevich-top-right"/>
        </div>
        <div class="parralax-item-top-left">
          <AppIcon name="malevich-top-left"/>
        </div>
      </li>
      <li class="prllx-block" data-depth=".1">
        <div class="parralax-item-bottom-right-triangle"></div>
        <div class="parralax-item-top-left-multi"></div>
        <div class="parralax-item-bottom-left-pattern">
          <AppIcon name="malevich-bottom-left-pattern"/>
        </div>
      </li>
      <li class="prllx-block" data-depth=".2">
        <div class="ps-parralax-item-top-right-circle"></div>
      </li>
    </div>
  }

  mounted() {
    const scene = this.$refs.scene as HTMLElement
    if (scene) { const parallax = new Parallax(scene) }
  }
}
