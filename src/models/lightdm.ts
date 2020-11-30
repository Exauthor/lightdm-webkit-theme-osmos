/* eslint-disable camelcase */
export interface ExpandedWindow {
  lightdm: Lightdm
  authentication_complete(): void
  lightdm_login(username: string, password: string, cb: any, errorCB: Error): void
  lightdm_start(desktop: string): void
  show_prompt(text: string, type?: any): void
  show_message(text: string, type: any): void
}

export interface Lightdm {
  is_authenticated: boolean,
  authentication_user?: string,
  default_session: string,
  can_suspend: boolean
  sessions: LightdmSession[]
  users: LightdmUsers[]
  languages: LightdmLanguage[]
  language: string
  start_authentication(username: string): void
  cancel_authentication(): void
  respond(password: string): void
  login(user: string, session: string): void
  shutdown(): void
  suspend(): void
  restart(): void
}

export interface LightdmUsers {
  display_name: string
  username: string
}

export interface LightdmLanguage {
  name: string
  code: string
}

export interface LightdmSession {
  name: string
  key: string
}

export const appWindow = window as unknown as Window & ExpandedWindow
console.log({ appWindow })

// export const lightdm = appWindow.lightdm
declare const lightdm: Lightdm
