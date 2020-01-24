'use strict';

const DEBUG_PASSWORD = 'password';
const DEFAULT_BG = require('./assets/images/background/index.jpg');


window.lightdm_debug = window.lightdm === undefined;

if (window.lightdm_debug) {

  window.theme_utils = {
    dirlist(_) {
      return [];
    }
  };

  window.greeter_config = {
    branding: {
        background_images: 'no where this is live test'
    }
  };

  window.lightdm = {
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
        name: 'Gnome 3',
        key: 'gnome-shell'
      },
      {
        name: 'XFCE 4',
        key: 'xfce'
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
        display_name: 'John Doe',
        username: 'Sisyphus'
      }, 
      {
        display_name: 'John Doe',
        username: 'Jon'
      }, 
      {
        display_name: 'Adrien Navratil',
        username: 'Store',
      }
    ],
    languages: [{
      name: 'American English',
      code: 'en_US.utf8'
    }, {
      name: 'Français',
      code: 'fr_FR.utf8'
    }],
    language: 'American English',
    start_authentication: (username) => {
      console.log(`Starting authenticating : '${username}'`);
      lightdm.authentication_user = username;

      show_prompt("Password: ");
    },
    cancel_authentication: () => {
      console.log('Auth cancelled');
    },
    respond: (password) => {
      console.log(`Password provided : '${password}'`);

      if (password === DEBUG_PASSWORD) {
        lightdm.is_authenticated = true;
      } else {
        let now = new Date().getTime();
        while (new Date().getTime() < now + 2000);
      }

      authentication_complete();
    },
    login: (user, session) => {
      alert(`Logged with '${user}' (Session: '${session}') !`);
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
  };
}

let password;
let errorCB;
let completeCB;

window.lightdm_login = (username, pass, cb, errCB) => {
  completeCB = cb;
  errorCB = errCB;
  password = pass;

  lightdm.start_authentication(username);
};

window.lightdm_start = (desktop) => {
  lightdm.login(lightdm.authentication_user, desktop);
};

window.show_prompt = (text, type) => {
  if (text === "Password: ")
  {
    lightdm.respond(password);
  }
};

window.authentication_complete = () => {
  if (lightdm.is_authenticated) {
    completeCB();
  } else {
    lightdm.cancel_authentication();
    errorCB('Invalid username/password');
  }
};

window.show_message = (text, type) => {
  errorCB(text);
};

export function backgrounds() {
  let result = [];

  const recDirlist = dir => {
    let result = [];
    for (const file of theme_utils.dirlist(dir)) {
      if (!file.includes('.')) { // I didn't find any good ways to do it
        result = [...result, ...recDirlist(file)];
      } else {
        result.push(file);
      }
    }

    return result;
  };

  for (const bg of recDirlist(greeter_config.branding.background_images)) {
    result.push('file://' + bg);
  }

  return [DEFAULT_BG, ...result];
}