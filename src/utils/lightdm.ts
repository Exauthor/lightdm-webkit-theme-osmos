import { Lightdm, appWindow } from '@/models/lightdm'

const DEBUG_PASSWORD = 'password'
// const DEFAULT_BG = require('./assets/images/background/index.jpg')

const lightdmDebug = appWindow.lightdm === undefined || true
const lightdm = appWindow.lightdm

if (lightdmDebug) {
  // window.theme_utils = {
  //   dirlist(_) {
  //     return []
  //   }
  // }

  // window.greeter_config = {
  // branding: {
  //   background_images: 'no where this is live test'
  // }
  // }

  appWindow.lightdm = {
    is_authenticated: false,
    authentication_user: undefined,
    default_session: 'plasma-shell',
    can_suspend: true,
    sessions: [
      {
        name: 'i3wm',
        key: 'i3'
      },
      {
        name: 'KDE 5',
        key: 'plasma-shell'
      },
      {
        name: 'Kodi',
        key: 'kodi'
      },
      {
        name: 'Gnome 3',
        key: 'gnome-shell'
      },
      {
        name: 'XFCE 4',
        key: 'xfce'
      },
      {
        name: 'Openbox',
        key: 'openbox'
      },
      {
        name: 'Cinnamon',
        key: 'cinnamon'
      },
      {
        name: 'xmonad',
        key: 'xmonad'
      }
    ],
    users: [
      {
        display_name: 'Tyler',
        username: 'Tyler'
      },
      {
        display_name: 'Bob',
        username: 'Bob'
      }
    ],
    languages: [{
      name: 'American English',
      code: 'en_US.utf8'
    }, {
      name: 'Русский',
      code: 'ru_RU.utf8'
    }],
    language: 'American English',
    start_authentication: (username) => {
      console.log(`Starting authenticating : '${username}'`)
      lightdm.authentication_user = username

      appWindow.show_prompt('Password: ')
    },
    cancel_authentication: () => {
      console.log('Auth cancelled')
    },
    respond: (password) => {
      console.log(`Password provided : '${password}'`)

      if (password === DEBUG_PASSWORD) {
        lightdm.is_authenticated = true
      } else {
        const now = new Date().getTime()
        while (new Date().getTime() < now + 2000);
      }

      appWindow.authentication_complete()
    },
    login: (user, session) => {
      alert(`Logged with '${user}' (Session: '${session}') !`)
    },
    shutdown: () => {
      alert('(DEBUG: System is shutting down)')
    },
    suspend: () => {
      alert('(DEBUG: System is suspending)')
    },
    restart: () => {
      alert('(DEBUG: System is rebooting)')
    }
  }
}

let password: string
let errorCB: any
let completeCB: any

appWindow.lightdm_login = (username, pass, cb, errCB) => {
  completeCB = cb
  errorCB = errCB
  password = pass

  lightdm.start_authentication(username)
}

appWindow.lightdm_start = (desktop) => {
  lightdm.login(lightdm.authentication_user || '', desktop)
}

appWindow.show_prompt = (text, type) => {
  if (text === 'Password: ') {
    lightdm.respond(password)
  }
}

appWindow.authentication_complete = () => {
  if (lightdm.is_authenticated) {
    completeCB()
  } else {
    lightdm.cancel_authentication()
    errorCB('Invalid username/password')
  }
}

appWindow.show_message = (text, type) => {
  errorCB(text)
}

// export function backgrounds() {
//   const result = []

//   const recDirlist = dir => {
//     let result = []
//     for (const file of theme_utils.dirlist(dir)) {
//       if (!file.includes('.')) { // I didn't find any good ways to do it
//         result = [...result, ...recDirlist(file)]
//       } else {
//         result.push(file)
//       }
//     }

//     return result
//   }

//   for (const bg of recDirlist(greeter_config.branding.background_images)) {
//     result.push('file://' + bg)
//   }

//   return [DEFAULT_BG, ...result]
// }
