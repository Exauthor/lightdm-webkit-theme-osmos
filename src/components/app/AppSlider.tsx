import { Component, Prop, Vue } from 'vue-property-decorator'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import noUiSlider from 'nouislider'

@Component
export default class AppSlider extends Vue {
  @Prop({ type: [Number], default: '' }) value!: number
  @Prop({ default: '' }) label!: string
  @Prop({ type: Number, default: 0 }) from!: number
  @Prop({ type: Number, default: 100 }) to!: number
  @Prop({ type: Number, default: 1 }) step!: number

  changeState(event: Event) {
    event.stopPropagation()

    this.$emit('input', !this.value)
  }

  mounted() {
    const slider = this.$refs.slider as any

    noUiSlider.create(slider, {
      start: this.value,
      connect: 'lower',
      step: this.step,
      range: {
        min: this.from,
        max: this.to
      }
    })

    slider.noUiSlider.on('set', (values: string[]) => {
      const value = parseFloat(values[0])

      this.$emit('input', value)
    })
  }

  render() {
    return <div class="color-selector">
      <p class="mb-3"> { this.$t(this.label) } </p>
      <div class="center-x">
        <div ref="slider" class="slider-input"></div>
      </div>
    </div>
  }
}
