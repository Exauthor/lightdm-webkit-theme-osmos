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

    if (isEnter) {
      if (PageModule.activeBlocks.length === 0) {
        PageModule.openBlock({ id: 'login' })
      }
    } else if (isEscape) {
      PageModule.closeBlock()
    }
  }

  mounted() {
    PageModule.openBlock({ id: 'settings' })

    window.addEventListener('keyup', this.keyPress)
    // window.addEventListener('mousedown', this.handleClick)
  }
}
