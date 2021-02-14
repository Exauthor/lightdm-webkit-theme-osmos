import { AppTheme } from '@/models/app'
import { AppModule } from '@/store/app'
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

@Component
export default class InfinityTheme extends Vue {
  get theme() {
    return AppModule.activeTheme as AppTheme
  }

  get pallete() {
    const input = AppModule.getThemeSettings('pallete')
    const index = input?.value as number || 0
    const values = input?.values || []

    return values[index] as string[] || ['#51eaea', '#fffde1', '#ff9d76', '#FB3569']
  }

  get amount() {
    return AppModule.getThemeSettings('amount')?.value || 30 || 30
  }

  get animationTime() {
    return AppModule.getThemeSettings('animationTime')?.value || 35 || 35
  }

  get depth() {
    return AppModule.getThemeSettings('depth')?.value || 100 || 100
  }

  get size() {
    return AppModule.getThemeSettings('size')?.value || 17 || 18
  }

  get perspective() {
    return AppModule.getThemeSettings('perspective')?.value as number || 12 || 12
  }

  get color() {
    return `@p(${this.pallete.join(', ')});`
  }

  render(h: CreateElement) {
    return h('div', {
      class: 'center-position',
      domProps: {
        innerHTML: `<css-doodle>
          :doodle {
            @grid: ${this.amount}x1 / ${this.size}vmin;
            --deg: @p(-180deg, 180deg);
          }
          :container {
            perspective: ${this.perspective}vmin;
          }
          :after, :before {
            content: '';
            background: ${this.color}; 
            @place-cell: @r(100%) @r(100%);
            @size: @r(6px);
            @shape: heart;
          }
        
          @place-cell: center;
          @size: ${this.depth}%;
        
          box-shadow: @m200(0 0 50px ${this.color});
          background: @m100(
            radial-gradient(${this.color} 50%, transparent 0) 
            @r(-20%, 120%) @r(-20%, 100%) / 1px 1px
            no-repeat
          );
        
          will-change: transform, opacity;
          animation: scale-up ${this.animationTime}s linear infinite;
          animation-delay: calc(-${this.animationTime}s / @size() * @i());
    
          @keyframes scale-up {
            0%, 95.01%, 100% {
              transform: translateZ(0) rotate(0);
              opacity: 0;
            }
            10% { 
              opacity: 1; 
            }
            95% {
              transform: translateZ(${this.perspective * 1.2}vmin) rotateZ(@var(--deg));
            }
          }
        </css-doodle>`
      }
    })
  }
}
