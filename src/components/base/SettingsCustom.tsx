import { Component, Vue } from 'vue-property-decorator'

import AppSelector from '@/components/app/AppSelector'
import { AppModule } from '@/store/app'
import { AppInputColor, AppInputTheme, AppTheme } from '@/models/app'
import AppColorSelector from '@/components/app/AppColorSelector'

@Component({
  components: {
    AppSelector,
    AppColorSelector
  }
})
export default class SettingsCustom extends Vue {
  get theme() {
    return AppModule.activeTheme as AppTheme
  }

  get inputs() {
    return this.theme.settings || []
  }

  render() {
    return <div class='user-settings-general'>
      <div>
        { this.inputs.map((input: AppInputTheme) => {
          switch (input.type) {
            case 'color': {
              return <AppColorSelector {...{
                props: {
                  label: 'Disable animation',
                  value: input.value
                },
                on: {
                  input: (color: AppInputColor) => {
                    AppModule.changeSettingsThemeInput({ key: input.name, value: color.hex })
                  }
                }
              }}/>
            }
            default: {
              return <div> I don't find </div>
            }
          }
        }) }
      </div>
    </div>
  }
}
