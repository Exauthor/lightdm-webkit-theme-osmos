import { Component, Prop, Vue } from 'vue-property-decorator'

import { PageModule } from '@/store/page'
import AppIcon from '@/components/app/AppIcon.vue'
import { AppMenuItem, AppMenuPosition } from '@/models/page'

@Component({
  components: { AppIcon }
})
export default class AppSelector extends Vue {
  @Prop({ type: [Object, String], default: null }) value!: AppMenuItem | string | null
  @Prop({ type: [Array], default: () => [] }) items!: AppMenuItem[]
  @Prop({ default: '' }) label!: string

  selectedValue: null | AppMenuItem | string = null

  get fullItem() {
    const selected = this.value !== null ? this.value : this.selectedValue

    return this.items.find(({ value }) => {
      const finalValue = typeof selected === 'object' ? selected?.value : selected
      return value === finalValue
    })
  }

  get menu() {
    return PageModule.menu
  }

  get isActive() {
    return this.menu?.view && this.menu?.node === this.$refs.selector
  }

  get currentValueLabel() {
    const selected = this.fullItem ?? this.selectedValue
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

    this.selectedValue = item
    this.$emit('input', finalValue)
  }

  render() {
    return <div
      onClick={(event: Event) => { this.openSelector(event) }}
      ref="selector"
      class={['selector', this.isActive ? 'active' : '']}
    >
      <h2 class='selector-label'>
        { this.fullItem?.icon ? <AppIcon {...{
          class: 'menu-icon selector-icon',
          props: {
            name: this.fullItem.icon
          }
        }}></AppIcon> : null }
        { this.currentValueLabel || this.label }
      </h2>
      <AppIcon {...{
        props: {
          name: 'arrow'
        },
        class: 'icon selector-arrow'
      }}></AppIcon>
    </div>
  }
}
