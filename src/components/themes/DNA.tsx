import { AppTheme } from '@/models/app'
import { AppModule } from '@/store/app'
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

@Component
export default class DNATheme extends Vue {
  get theme() {
    return AppModule.activeTheme as AppTheme
  }

  get activeColor() {
    return AppModule.getThemeSettings('activeColor')?.value || '#fa076c'
  }

  get secondColor() {
    return AppModule.getThemeSettings('secondColor')?.value || '#FFFDE1'
  }

  get amount() {
    return AppModule.getThemeSettings('amount')?.value || '45'
  }

  render(h: CreateElement) {
    return h('div', {
      class: 'center-position',
      domProps: {
        innerHTML: `<css-doodle>
          :doodle {
            @grid: ${this.amount}x1 / 40vmin;
            position: relative;
            z-index: 1;
          }
          :container {
            transform: translate(-80%, 30%) rotate(90deg);
          }
          :after, :before {
            content: '';
            @place-cell: center;
            @size: 100%;
            background: radial-gradient(
              @p(${this.secondColor}, ${this.activeColor}) @r(70%),
              transparent 0
            )
            @pn(30% 50%, 70% 50%, 50% 60%) /
            @r(.1vmin, 5vmin) @lr()
            no-repeat;
          }
    
          @place-cell: centerr;
          @size: 100%;
    
          will-change: transform;
          animation: r 4s linear infinite;
          animation-delay: calc(-4s / @size() * @i());
    
          --translate: translateY(calc(-66vmin / @size() * @i()));
          @keyframes r {
            from { transform: var(--translate) rotate(0) }
            to { transform: var(--translate) rotateZ(-1turn) }
          }
        </css-doodle>`
      }
    })
  }
}
