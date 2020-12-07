import { AppModule } from '@/store/app'
import { PageModule } from '@/store/page'
import { Component, Vue } from 'vue-property-decorator'

const languageTransform = {
  ru: 'ru-RU',
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
  fr: 'fr-FR',
  pl: 'pl-PL'
}

@Component
export default class TimeTheme extends Vue {
  currentTime = new Date().getTime()

  get language() {
    return AppModule.language
  }

  get formattedTime() {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }

    return new Intl.DateTimeFormat(languageTransform[this.language], options).format(new Date(this.currentTime))
  }

  get getTime() {
    const options = {
      hour: '2-digit',
      minute: '2-digit'
    }

    return new Intl.DateTimeFormat(languageTransform[this.language], options).format(new Date(this.currentTime))
  }

  get timeArray() {
    return PageModule.timeArray.slice(1)
  }

  mounted() {
    const svgNode = document.querySelector('#svg-time') as SVGPathElement

    svgNode.childNodes.forEach((node, i, arr) => {
      const path = node as SVGPathElement
      const length = path.getTotalLength()
      path.getBoundingClientRect()
      const part = i !== 0 ? 60 : 24

      path.style.transition = '0s'
      path.style.strokeDasharray = length + ' ' + length
      path.style.strokeDashoffset = length - (length / part * this.timeArray[i]) + ''

      setTimeout(() => {
        const time = 60 ** (arr.length - i)
        const timeLeft = (60 ** (arr.length - i)) - (this.timeArray[i] * (60 ** (arr.length - i - 1)))

        path.style.transition = `${timeLeft}s linear`

        setTimeout(() => {
          this.updatePath(path, time)
          setInterval(() => {
            this.updatePath(path, time)
          }, time * 1000)
        }, timeLeft * 1000)
        path.style.strokeDashoffset = '0'
      }, 200)
    })
  }

  updatePath(path: SVGPathElement, time: number) {
    const length = path.getTotalLength()

    path.style.transition = '3s'
    path.style.strokeDasharray = length + ' ' + length
    path.style.strokeDashoffset = length - 1 + ''
    this.currentTime = new Date().getTime()

    setTimeout(() => {
      path.style.transition = `${time - (time / 20)}s linear`
      path.style.strokeDashoffset = '0'
    }, 3000)
  }

  render() {
    return <div class="body center-position">
      <div class="time center-position">
        <h1 class="time-format"> { this.getTime } </h1>
        <h3> { this.formattedTime } </h3>
      </div>
      <svg id="svg-time" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 530 530" width="530" height="530">
        <path d=" M 264.272 15 C 402.25 15 514.597 127.021 514.999 265 C 515.401 402.979 403.706 515 265.728 515 C 127.75 515 15.403 402.979 15.001 265 C 14.599 127.021 126.294 15 264.272 15 Z " fill="none" stroke-width="30" stroke="rgb(10,170,162)" stroke-linejoin="miter" stroke-linecap="round" stroke-miterlimit="3"/>
        <path d=" M 265 52.501 C 382.282 52.843 477.5 148.338 477.5 265.619 C 477.5 382.9 382.282 477.841 265 477.499 C 147.718 477.157 52.5 381.662 52.5 264.381 C 52.5 147.1 147.718 52.159 265 52.501 Z " fill="none" stroke-width="30" stroke="rgb(145,230,10)" stroke-linejoin="miter" stroke-linecap="round" stroke-miterlimit="3"/>
        <path d="M 265 90.001 C 361.585 90.293 440 168.945 440 265.529 C 440 362.114 361.585 440.291 265 439.999 C 168.415 439.707 90 361.055 90 264.471 C 90 167.886 168.415 89.709 265 90.001 Z " fill="none" stroke-width="30" stroke="rgb(255,28,118)" stroke-linejoin="miter" stroke-linecap="round" stroke-miterlimit="3"/>
      </svg>
    </div>
  }
}
