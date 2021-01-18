export interface AppSettings {
  version: string;
  currentTheme: string;
  username: string;
  desktop: string;
  defaultColor: string;
  themes: AppTheme[];
}

export interface AppImageTheme {
  fullscreen: boolean;
  color: {
    active: string;
    background: string;
  };
}

export interface AppTheme extends AppImageTheme {
  name: string;
  component: string;
  settings?: AppInputTheme[];
}

export interface AppInputTheme {
  name: string;
  value: AppInputThemeValue;
  label: string;
  type: AppInputThemeType;
}

export type AppInputThemeType = 'color' | 'selector' | 'slider' | 'carousel' | 'checkbox'
export type AppInputThemeValue = string | boolean | string[]
export interface AppInputColor {
  a: string;
  hex: string;
  hex8: string;
  hsl: string;
  hsv: string;
  oldHue: string;
  rgba: string;
  source: string;
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
    name: 'DNA',
    component: 'dna',
    fullscreen: false,
    settings: [
      {
        name: 'activeColor',
        type: 'color',
        label: 'input.color-active',
        value: '#fa076c'
      }
    ],
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
    component: 'polygon',
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
    component: 'time',
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
