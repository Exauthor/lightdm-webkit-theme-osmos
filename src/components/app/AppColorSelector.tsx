import { Component, Prop, Vue } from 'vue-property-decorator'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Chrome } from 'vue-color'

@Component({
  components: { Chrome }
})
export default class AppColorSelector extends Vue {
  @Prop({ type: String, default: '#fff' }) value!: string
  @Prop({ default: '' }) label!: string

  changeState(event: Event) {
    event.stopPropagation()

    this.$emit('input', !this.value)
  }

  render() {
    return <div class="color-selector">
      <p> { this.$t(this.label) } </p>
      <Chrome
        { ...{
          props: {
            disableAlpha: true,
            disableFields: true,
            value: this.value
          },
          on: this.$listeners
        }}
      >
      </Chrome>
    </div>
  }
}
