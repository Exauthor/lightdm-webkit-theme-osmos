import Vue from 'vue'
import VueI18n, { IVueI18n } from 'vue-i18n'

declare module '*.vue' {

  export default Vue
}

declare module 'vue/types/vue' {
  export interface Vue {
    readonly $i18n: VueI18n & IVueI18n;
    $t: typeof VueI18n.prototype.t;
    $tc: typeof VueI18n.prototype.tc;
    $te: typeof VueI18n.prototype.te;
    $d: typeof VueI18n.prototype.d;
    $n: typeof VueI18n.prototype.n;
  }
}
