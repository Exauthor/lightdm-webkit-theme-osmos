import { Component, Prop, Vue } from 'vue-property-decorator'

import AppIcon from '@/components/app/AppIcon.vue'
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
    console.log(this.$listeners)
    return <Chrome
      { ...{
        props: {
          value: this.value
        },
        on: this.$listeners
      }}
    >
    </Chrome>
  }
}
