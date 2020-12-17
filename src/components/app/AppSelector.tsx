import { Component, Prop, Vue } from 'vue-property-decorator'

import { PageModule } from '@/store/page'
import AppIcon from '@/components/app/AppIcon.vue'
import { AppMenuItem, AppMenuPosition } from '@/models/page'

@Component({
  components: { AppIcon }
})
export default class AppSelector extends Vue {
  @Prop({ type: [Object, String], default: null }) value: any
  @Prop({ type: [Array], default: () => [] }) items!: AppMenuItem[]
  @Prop({ default: '' }) label: any

  selectedValue: null | Record<string, any> | string = null
  isActive = false

  openSelector() {
    const { bottom, left, top, height, width } = this.$refs.selector?.getBoundingClientRect()
    const allHeight = window.innerHeight

    this.isActive = true

    const positionY = bottom > top ? 'bottom' : 'top'
    const position: AppMenuPosition = { left, width }

    if (positionY === 'bottom') {
      position.top = top + height
    } else {
      position.bottom = allHeight - bottom + height
    }

    PageModule.ASSING_MENU({
      position,
      view: true,
      items: this.items,
      handler: this.callback
    })

    this.isActive = !this.isActive
  }

  callback(value: AppMenuItem) {
    console.log({ value })
    this.$emit('value', value)

    if (this.value === null) {
      this.selectedValue = value
    }
  }

  render() {
    return <div onClick={() => { this.openSelector() }} ref="selector" class={['selector', this.isActive ? 'active' : '']}>
      <h2 class='selector-label'> { this.selectedValue || this.label } </h2>
      <AppIcon name='arrow' class='icon'></AppIcon>
    </div>
  }
}
