export interface AppSettings {
  version: string
  language: string
  loginPosition: string
  currentTheme: string
  username: string
  desktop: string
  defaultColor: string
}

export interface AppTimestamp {
  seconds: number
  minutes: number
  hours: number
}

export interface AppImageTheme {
  fullscreen: boolean
  color: {
    active: string
    background: string
  }
}

export interface AppTheme extends AppImageTheme {
  name: string
  component: string
}

export const defaultTheme: AppTheme = {
  name: 'Fluid',
  component: 'fluid',
  fullscreen: true,
  color: {
    active: '#04ded4',
    background: 'black'
  }
}

export const AppThemes: AppTheme[] = [
  defaultTheme,
  {
    name: 'Neon',
    component: 'neon',
    fullscreen: true,
    color: {
      active: '#04ded4',
      background: 'black'
    }
  },
  {
    name: 'Fire',
    component: 'fire',
    fullscreen: false,
    color: {
      active: '#fa076c',
      background: '#13111c'
    }
  },
  {
    name: 'Malevich',
    component: 'malevich',
    fullscreen: false,
    color: {
      active: '#F690FF',
      background: '#fff'
    }
  },
  {
    name: 'Polygon',
    component: 'polygonComponent',
    fullscreen: false,
    color: {
      active: '#f7bb3b',
      background: '#fff'
    }
  },
  {
    name: 'Osmos',
    component: 'osmos',
    fullscreen: true,
    color: {
      active: '#e13571',
      background: '#1a0532'
    }
  },
  {
    name: 'Space',
    component: 'space',
    fullscreen: true,
    color: {
      active: '#04ded4',
      background: '#19102e'
    }
  },
  {
    name: 'Mars',
    component: 'mars',
    fullscreen: true,
    color: {
      active: '#FF3333',
      background: '#100e18'
    }
  },
  {
    name: 'Time',
    component: 'timeComponent',
    fullscreen: false,
    color: {
      active: '#91e60a',
      background: '#13111c'
    }
  },
  {
    name: 'Sahara',
    component: 'sahara',
    fullscreen: true,
    color: {
      active: '#b2299b',
      background: '#230C54'
    }
  }
]
