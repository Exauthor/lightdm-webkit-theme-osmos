import { Component, Prop, Vue } from 'vue-property-decorator'

import { PageModule } from '@/store/page'
import AppIcon from '@/components/app/AppIcon.vue'
import { AppMenuItem, AppMenuPosition } from '@/models/page'

@Component({
  components: { AppIcon }
})
export default class AppSelector extends Vue {
  @Prop({ type: [Object, String], default: null }) value!: AppMenuItem | string
  @Prop({ type: [Array], default: () => [] }) items!: AppMenuItem[] | string[]
  @Prop({ default: '' }) label!: string

  selectedValue: null | AppMenuItem | string = null

  get menu() {
    return PageModule.menu
  }

  get isActive() {
    return this.menu?.view && this.menu?.node === this.$refs.selector
  }

  get currentValueLabel() {
    const selected = this.value ?? this.selectedValue
    return typeof selected === 'object' ? selected?.text : selected
  }

  openSelector(event: Event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.menu.view) {
      return PageModule.ASSING_MENU({ view: false })
    }

    PageModule.ASSING_MENU({
      node: this.$refs.selector as HTMLElement,
      view: true,
      items: this.items,
      handler: this.callback
    })
  }

  callback(item: AppMenuItem | string) {
    const finalValue = typeof item === 'object' ? item.value : item

    if (this.value === null) {
      this.selectedValue = item
    } else {
      this.$emit('input', finalValue)
    }
  }

  render() {
    return <div onClick={(event: Event) => { this.openSelector(event) }} ref="selector" class={['selector', this.isActive ? 'active' : '']}>
      <h2 class='selector-label'> { this.currentValueLabel || this.label } </h2>
      <AppIcon name='arrow' class='icon'></AppIcon>
    </div>
  }
}
