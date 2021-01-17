import { Component, Vue } from 'vue-property-decorator'
import BackgroundImage from '@/components/base/BackgroundImage'
import LoginComponent from '@/components/base/LoginComponent'
import AppMenu from '@/components/app/AppMenu'
import { PageModule } from '@/store/page'
import { LoginPosition } from '@/models/page'

@Component({
  components: {
    AppMenu,
    LoginComponent,
    BackgroundImage
  }
})
export default class HomePage extends Vue {
  get activeBlock() {
    return PageModule.activeBlock
  }

  get menu() {
    return PageModule.menu
  }

  created() {
    // Set language
    const language = localStorage.getItem('language') || 'en'
    this.$i18n.locale = language
    PageModule.SET_STATE_PAGE({ key: 'language', value: language })

    // Set login position
    const loginPosition = localStorage.getItem('loginPosition') as LoginPosition || 'center'
    PageModule.SET_STATE_PAGE({ key: 'loginPosition', value: loginPosition })

    // Set active block
    PageModule.openBlock({ id: 'settings' })
    PageModule.SET_STATE_PAGE({ key: 'languages', value: this.$i18n.availableLocales })

    document.addEventListener('keyup', this.keyPress)
    document.addEventListener('click', this.handleClick)
  }

  handleClick(event: MouseEvent) {
    console.log('HandleCLICk')

    const isOpenMenu = false
    if (isOpenMenu) return

    const target = event.target as Node

    if (!this.activeBlock) {
      PageModule.openBlock({ id: 'login' })
      return
    }

    const activeBlocks = document.querySelectorAll(`.block-${this.activeBlock.id}`)
    const isClickOnAciveBlock = Array.from(activeBlocks).some(node => node.contains(target))
    const menuNode = document.querySelector('#menu')
    const isClickOnMenu = menuNode?.contains(target)

    if (this.menu.view && !isClickOnMenu) {
      console.time('SELECTOR')
      PageModule.ASSING_MENU({ view: false })
      // setTimeout(() => { PageModule.ASSING_MENU({ view: false }) }, 145)
    } else if (!isClickOnAciveBlock) {
      PageModule.closeBlock()
    }
  }

  keyPress(event: KeyboardEvent) {
    const isEnter = event.key === 'Enter'
    const isEscape = event.key === 'Escape'
    const arrowCodes = ['ArrowRight', 'ArrowLeft'] // event.code
    const isFocusPassword = document.querySelector('#password:focus')

    const [pCode, rCode, sCode] = [80, 82, 83]

    if (PageModule.activeBlocks.length === 0) {
      PageModule.openBlock({ id: 'login' })
    } else if (isEnter) {
      console.log('LOGIN')
    } else if (isEscape) {
      if (this.menu.view) {
        PageModule.ASSING_MENU({ view: false })
      } else {
        PageModule.closeBlock()
      }
    }
  }

  render() {
    return (
      <div class="index">
        <BackgroundImage />
        <LoginComponent />
        <AppMenu />
      </div>
    )
  }
}
