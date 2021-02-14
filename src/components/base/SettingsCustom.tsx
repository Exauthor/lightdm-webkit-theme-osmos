import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/app'
import { AppInputColor, AppInputTheme, AppTheme } from '@/models/app'

import AppSlider from '@/components/app/AppSlider'
import AppCheckbox from '@/components/app/AppCheckbox'
import AppSelector from '@/components/app/AppSelector'
import AppColorSelector from '@/components/app/AppColorSelector'
import AppPalleteSelector from '@/components/app/AppPalleteSelector'

@Component({
  components: {
    AppSlider,
    AppSelector,
    AppColorSelector,
    AppPalleteSelector
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
    return <div class='user-settings-custom'>
      { this.inputs.map((input: AppInputTheme) => {
        switch (input.type) {
          case 'color': {
            return <AppColorSelector {...{
              props: {
                label: input.label,
                value: input.value
              },
              class: input.options?.class,
              on: {
                input: (color: AppInputColor) => {
                  AppModule.changeSettingsThemeInput({ key: input.name, value: color.hex })

                  if (input.callback) {
                    input.callback(color.hex)
                  }
                }
              }
            }}/>
          }
          case 'slider': {
            return <AppSlider {...{
              props: {
                label: input.label,
                value: input.value,
                from: input?.options?.min,
                to: input?.options?.max
              },
              on: {
                input: (value: number) => {
                  AppModule.changeSettingsThemeInput({ key: input.name, value })

                  if (input.callback) {
                    input.callback(value)
                  }
                }
              }
            }}/>
          }
          case 'checkbox': {
            return <AppCheckbox {...{
              props: {
                label: input.label,
                value: input.value
              },
              on: {
                input: (value: boolean) => {
                  AppModule.changeSettingsThemeInput({ key: input.name, value })

                  if (input.callback) {
                    input.callback(value)
                  }
                }
              }
            }}/>
          }
          case 'pallete': {
            console.log({ input })
            return <AppPalleteSelector {...{
              props: {
                label: input.label,
                value: input.value,
                values: input.values
              },
              on: {
                input: (value: boolean) => {
                  // debugger
                  AppModule.changeSettingsThemeInput({ key: input.name, value })
                }
              }
            }}/>
          }
          default: {
            return <div> I din't find </div>
          }
        }
      }) }
    </div>
  }
}
