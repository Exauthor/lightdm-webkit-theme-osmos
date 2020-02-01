export default {
  getters: {
    color: (stage, getters, rootStage, rootGetters) => {
      return rootGetters['settings/getCurrentTheme'].color.active
    },
    colorDark: (stage, getters) => {
      return getters.CHANGE_HSL(getters.CONVERT_TO_HSL(getters.color), 0, -0, -10)
    },
    colorDarker: (stage, getters) => {
      return getters.CHANGE_HSL(getters.CONVERT_TO_HSL(getters.color), 0, -0, -20)
    },
    colorDarkest: (stage, getters) => {
      return getters.CHANGE_HSL(getters.CONVERT_TO_HSL(getters.color), 0, -0, -40)
    },
    CONVERT_TO_HSL: (state, getters) => (color) => {
      var type = color.slice(0,3);
      if (type === 'rgb') {
        return getters.RGB_TO_HSL(...getters.FROM_BRACKETS_TO_NUM(color));
      } else if (color[0] === '#') {
        return getters.RGB_TO_HSL(...getters.HEX_TO_RGB(color)) 
      } else {
        return color;
      }
    },

    CHANGE_HSL: (state, getters) => (hsl, hAdd, sAdd, lAdd) => {
      var hslMass = getters.FROM_BRACKETS_TO_NUM(hsl);
      return `hsl(${hslMass[0] + hAdd}, ${hslMass[1] + sAdd}%, ${hslMass[2] + lAdd}%)`;
    },

    FROM_BRACKETS_TO_NUM: (state) => (color) => {
      var num = color.slice(color.indexOf('(') + 1).replace(")", "").split(",") ;
      return [parseInt(num[0]), parseInt(num[1]), parseInt(num[2])];
    },

    HEX_TO_RGB: (state) => (color) => {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      return result ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
      ] : null;
    },

    RGB_TO_HSL: (state) => (r, g, b) => {
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min){
        h = s = 0; // achromatic
      } else {
        var d = (max - min);
        s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
        switch(max) {
          case r: h = ((g - b) / d + 0)*60; break;
          case g: h = ((b - r) / d + 2)*60; break;
          case b: h = ((r - g) / d + 4)*60; break;
        }
      }

      return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}% )`;
    },
  },
}
