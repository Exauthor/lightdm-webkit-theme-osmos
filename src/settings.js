let local = localStorage.getItem('settings');

if (local === 'undefined') {
  local = null;
}

//let settings = (local ? JSON.parse(local) : null) || {
let settings = {
  first: false,

  mode: 'classic',

  disableSplash: true,
  disableSplashText: false,
  disableIntro: false,
  disableFade: false,
  roundAvatar: false,
  disableAvatar: false,
  disableZoom: false,
  clock12: false,

  user: lightdm.users[0],
  users: lightdm.users,
  desktop: lightdm.sessions[0],
  desktops: lightdm.sessions
};

// Handle display name change
lightdm.users.forEach(u => settings.user.username === u.username && (settings.user = u));
lightdm.sessions.forEach(s => settings.desktop.username === s.key && (settings.desktop = s));

save();

function save(s) {
  localStorage.setItem('settings', JSON.stringify(s ? settings = s : settings));
}

function avatar(avatar) {
  if (!avatar || avatar === '') {
    return 'user';
  }

  return avatar;
}

export {
  settings,
  avatar,
  save
}
