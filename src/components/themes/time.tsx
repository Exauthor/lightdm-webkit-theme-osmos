import { AppModule } from '@/store/app'
import { PageModule } from '@/store/page'
import { Component, Vue } from 'vue-property-decorator'

const languageTransform: Record<string, string> = {
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
    return PageModule.language
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
  }

  render() {
    return <div class="body center-position">
      <div class="time center-position">
        <h1 class="time-format"> { this.getTime } </h1>
        <h3 class="time-format-subtitle"> { this.formattedTime } </h3>
      </div>
    </div>
  }
}
