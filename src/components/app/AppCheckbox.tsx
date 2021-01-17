import { Component, Prop, Vue } from 'vue-property-decorator'

import AppIcon from '@/components/app/AppIcon.vue'

@Component({
  components: { AppIcon }
})
export default class AppCheckbox extends Vue {
  @Prop({ type: Boolean, default: false }) value!: boolean
  @Prop({ default: '' }) label!: string

  get isActive() {
    return this.value
  }

  get idCheckbox() {
    return `input-${this.label}`
  }

  changeState(event: Event) {
    this.$emit('input', !this.value)
  }

  render() {
    return <div
      class={['checkbox', this.value ? 'checkbox--active' : '']}
      onClick={(event: Event) => { this.changeState(event) }}
    >
      <div class="checkbox-control">
        <div class="checkbox-control-box">
          <AppIcon name="checkbox"></AppIcon>
        </div>
        <input type="checkbox" aria-checked={ this.value } id={ this.idCheckbox }/>
      </div>
      <p for={ this.idCheckbox } class="input-label" onClick={(event: Event) => { event.preventDefault() }}>
        { this.label }
      </p>
    </div>
  }
}
