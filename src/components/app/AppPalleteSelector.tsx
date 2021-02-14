import { Component, Prop, Vue } from 'vue-property-decorator'
import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: { AppIcon }
})
export default class AppPalleteSelector extends Vue {
  @Prop({ type: Number, default: 0 }) value!: number
  @Prop({ type: Array, required: true }) values!: string[][]
  @Prop({ default: '' }) label!: string

  activatePalette(index: number) {
    this.$emit('input', index)
  }

  render() {
    return <div class="palette-blocks">
      { this.values.map((colors, index) => {
        return <div
          onClick={ () => this.activatePalette(index) }
          class={ ['palette-block', index === this.value ? 'active' : ''] }
        >
          { colors.map((color) => {
            return <div class="palette-block-color" style={ `background-color: ${color}` }></div>
          })}
        </div>
      }) }
    </div>
  }
}
