import { Component, Prop, Vue } from 'vue-property-decorator'
import { PageModule } from '@/store/page'
import AppIcon from '@/components/app/AppIcon.vue'
import { AppMenuItem, AppMenuPosition } from '@/models/page'

@Component({
  components: { AppIcon }
})
export default class AppMenu extends Vue {
  isActive = false

  get menu() {
    return PageModule.menu
  }

  get style() {
    return Object.entries(this.menu.position).reduce((acc, [property, value]) => {
      acc += `${property}: ${value}px;`
      return acc
    }, '')
  }

  async handleCallback(item: AppMenuItem | string) {
    if (this.menu.handler) {
      await this.menu.handler(item)
    }

    this.closeMenu()
  }

  closeMenu() {
    PageModule.ASSING_MENU({
      view: false
    })
  }

  render() {
    return <div { ...{ on: { mousedown: (event: MouseEvent) => { event.stopPropagation(); event.preventDefault() } } } }>
      <transition name='fade'>
        { this.menu.view
          ? <ul class='menu-list' id='menu' style={this.style}>
            { this.menu.items.map((item: AppMenuItem | string, i: number) => {
              return <li
                class='menu-list-item'
                key={i}
                onClick={() => { this.handleCallback(item) }}
              >
                { typeof item === 'string' ? item : item.text }
              </li>
            }
            )}
          </ul>
          : null
        }
      </transition>
    </div>
  }
}
