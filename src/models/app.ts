export interface AppSettings {
  version: string;
  currentTheme: string;
  currentOs: string;
  username: string;
  desktop: string;
  defaultColor: string;
  bodyClass: Record<string, boolean>;
  themes: AppTheme[];
}

export interface AppThemeGeneral {
  name: string;
  fullscreen: boolean;
  color: {
    active: string;
    background: string;
  };
}

export interface AppImageTheme extends Omit<AppThemeGeneral, 'name'> {
  name?: string | null ;
  component?: null;
  settings?: null;
}

export interface AppTheme extends AppThemeGeneral {
  component: string;
  settings?: AppInputTheme[] | null;
}

export interface AppInputTheme {
  name: string;
  value: AppInputThemeValue;
  label: string;
  type: AppInputThemeType;
  values?: string[][];
  options?: AppInputThemeOptions;
  callback?: (value: AppInputThemeValue) => void;
}

export interface AppInputThemeOptions {
  class: string;
  min?: number;
  max?: number;
}

export type AppInputThemeType = 'color' | 'selector' | 'slider' | 'carousel' | 'checkbox' | 'pallete'

export type AppInputThemeValue = string | boolean | string[] | number

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

function setActiveColor(color: AppInputThemeValue) {
  document.documentElement.style.setProperty('--color-active', color + '')
}

export const defaultTheme: AppTheme = {
  name: 'Space',
  component: 'space',
  fullscreen: true,
  color: {
    active: '#04ded4',
    background: '#19102e'
  }
}

export const AppThemes: AppTheme[] = [
  defaultTheme,
  {
    name: 'Fluid',
    component: 'fluid',
    fullscreen: true,
    color: {
      active: '#04ded4',
      background: 'black'
    }
  },
  {
    name: 'Sky',
    component: 'sky',
    fullscreen: true,
    color: {
      active: '#04ded4',
      background: 'black'
    }
  },
  {
    name: 'Blob',
    component: 'blob',
    fullscreen: true,
    color: {
      active: '#04ded4',
      background: 'black'
    }
  },
  {
    name: 'Flow',
    component: 'flow',
    fullscreen: true,
    color: {
      active: '#04ded4',
      background: 'black'
    }
  },
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
    name: 'Waves',
    component: 'waves',
    fullscreen: false,
    color: {
      active: '#fa076c',
      background: '#13111c'
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
        value: '#fa076c',
        options: {
          class: ''
        }
      },
      {
        name: 'secondColor',
        type: 'color',
        label: 'input.color-second',
        value: '#fffde1',
        options: {
          class: ''
        }
      },
      {
        name: 'amount',
        type: 'slider',
        label: 'input.slider-amount',
        value: 69,
        options: {
          class: '',
          max: 100,
          min: 20
        }
      }
    ],
    color: {
      active: '#fa076c',
      background: '#13111c'
    }
  },
  {
    name: 'Infinity',
    component: 'infinity',
    fullscreen: true,
    settings: [
      {
        name: 'pallete',
        type: 'pallete',
        label: 'input.slider-amount',
        value: 0,
        values: [
          ['#fcb2bf', '#cf56a1', '#8b2f97', '#511e78'],
          ['#e3fdfd', '#cbf1f5', '#a6e3e9', '#71c9ce'],
          ['#e8f79a', '#49d292', '#3b445b', '#383746'],
          ['#f5f5f5', '#fc5185', '#3fc1c9', '#364f6b']
        ]
      },
      {
        name: 'depth',
        type: 'slider',
        label: 'input.depth',
        value: 70,
        options: {
          class: '',
          min: 50,
          max: 500
        }
      },
      {
        name: 'size',
        type: 'slider',
        label: 'input.size',
        value: 20,
        options: {
          class: '',
          min: 10,
          max: 50
        }
      },
      {
        name: 'perspective',
        type: 'slider',
        label: 'input.perspective',
        value: 12,
        options: {
          class: '',
          min: 2,
          max: 20
        }
      },
      {
        name: 'amount',
        type: 'slider',
        label: 'input.amount',
        value: 30,
        options: {
          class: '',
          min: 10,
          max: 100
        }
      },
      {
        name: 'animationTime',
        type: 'slider',
        label: 'input.animationTime',
        value: 20,
        options: {
          class: '',
          min: 15,
          max: 100
        }
      }
    ],
    color: {
      active: '#04ded4',
      background: '#19102e'
    }
  },
  {
    name: 'Malevich',
    component: 'malevich',
    fullscreen: false,
    settings: [
      {
        name: 'activeColor',
        type: 'color',
        label: 'input.color-active',
        value: '#F690FF',
        options: {
          class: 'w-50'
        },
        callback: setActiveColor
      }
    ],
    color: {
      active: '#F690FF',
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
    settings: [
      {
        name: 'activeColor',
        type: 'color',
        label: 'input.color-active',
        value: '#91e60a',
        callback: setActiveColor
      }
    ],
    color: {
      active: '#91e60a',
      background: '#13111c'
    }
  }
]
