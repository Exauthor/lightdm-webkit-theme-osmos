import { Component, Vue } from 'vue-property-decorator'
import BackgroundImage from '@/components/base/BackgroundImage'
import LoginComponent from '@/components/base/LoginComponent'
import { PageModule } from '@/store/page'

@Component({
  components: {
    BackgroundImage
  }
})
export default class HomePage extends Vue {
  render() {
    return (
      <div class="index">
        <BackgroundImage />
        <LoginComponent />
      </div>
    )
  }

  get activeBlock() {
    return PageModule.activeBlock
  }

  mounted() {
    PageModule.openBlock({ id: 'login' })

    window.addEventListener('keyup', this.keyPress)
    window.addEventListener('mousedown', this.handleClick)
  }

  handleClick(event: MouseEvent) {
    const isOpenMenu = false
    if (isOpenMenu) return

    const target = event.target as Node

    if (!this.activeBlock) {
      PageModule.openBlock({ id: 'login' })
      return
    }

    const activeBlocks = document.querySelectorAll(`.block-${this.activeBlock.id}`)
    const isClickOnAciveBlock = Array.from(activeBlocks).some(node => node.contains(target))

    if (!isClickOnAciveBlock) {
      PageModule.closeBlock()
    }
  }

  keyPress(event: KeyboardEvent) {
    const isEnter = event.key === 'Enter'
    const isEscape = event.key === 'Escape'
    console.log({ event, isEscape })
    const arrowCodes = ['ArrowRight', 'ArrowLeft'] // event.code
    const isFocusPassword = document.querySelector('#password:focus')

    const [pCode, rCode, sCode] = [80, 82, 83]

    // if (event.altKey && event.which === pCode) {
    //   this.SET_PAGE({ key: 'activeModal', value: 'shutdown'})
    // } else if (event.altKey && event.which === sCode) {
    //   this.SET_PAGE({ key: 'activeModal', value: 'suspend'})
    // } else if (event.altKey && event.which === rCode) {
    //   this.SET_PAGE({ key: 'activeModal', value: 'restart'})
    // }

    if (PageModule.activeBlocks.length === 0) {
      PageModule.openBlock({ id: 'login' })
    } else if (isEnter) {
      console.log('LOGIN')
    } else if (isEscape) {
      PageModule.closeBlock()
    }
  }
}
