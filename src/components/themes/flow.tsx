import { AppTheme } from '@/models/app'
import { AppModule } from '@/store/app'
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'

import SimplexNoise from 'simplex-noise'

const { PI, cos, sin, abs, random } = Math
const TAU = 2 * PI
const rand = (n: number) => n * random()
const randRange = (n: number) => n - rand(2 * n)
const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m
  return abs((t + hm) % m - hm) / (hm)
}

let container
let canvas: Record<string, HTMLCanvasElement>
let ctx: Record<string, CanvasRenderingContext2D>
let center: number[]
let tick: number
let simplex: SimplexNoise
let particleProps: Float32Array

@Component
export default class SkyTheme extends Vue {
  particlePropCount = 9
  rangeY = 1000
  baseTTL = 50
  rangeTTL = 150
  baseSpeed = 0.5
  rangeSpeed = 2
  baseRadius = 1
  rangeRadius = 5
  baseHue = 90
  rangeHue = 100
  noiseSteps = 8
  xOff = 0.00125
  yOff = 0.00125
  zOff = 0.0005
  backgroundColor = 'hsla(260,40%,5%,1)'
  stopAnimation = false

  get particleCount() {
    return AppModule.getThemeSettings('particleCount')?.value as number || 2000
  }

  get particlePropsLength() {
    return this.particleCount * this.particlePropCount
  }

  mounted() {
    this.setup()
    window.addEventListener('resize', this.resize)
  }

  beforeDestroy() {
    this.stopAnimation = true
    window.removeEventListener('resize', this.resize)
  }

  initParticle(i: number) {
    const x = rand(canvas.a.width)
    const y = center[1] + randRange(this.rangeY)
    const vx = 0
    const vy = 0
    const life = 0
    const ttl = this.baseTTL + rand(this.rangeTTL)
    const speed = this.baseSpeed + rand(this.rangeSpeed)
    const radius = this.baseRadius + rand(this.rangeRadius)
    const hue = this.baseHue + rand(this.rangeHue)

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
  }

  initParticles() {
    tick = 0
    simplex = new SimplexNoise()
    particleProps = new Float32Array(this.particlePropsLength)

    let i

    for (i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
      this.initParticle(i)
    }
  }

  checkBounds(x: number, y: number) {
    return (
      x > canvas.a.width ||
      x < 0 ||
      y > canvas.a.height ||
      y < 0
    )
  }

  drawParticle(x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number) {
    ctx.a.save()
    ctx.a.lineCap = 'round'
    ctx.a.lineWidth = radius
    ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
    ctx.a.beginPath()
    ctx.a.moveTo(x, y)
    ctx.a.lineTo(x2, y2)
    ctx.a.stroke()
    ctx.a.closePath()
    ctx.a.restore()
  }

  updateParticle(i: number) {
    const i2 = 1 + i; const i3 = 2 + i; const i4 = 3 + i; const i5 = 4 + i; const i6 = 5 + i; const i7 = 6 + i; const i8 = 7 + i; const i9 = 8 + i

    const x = particleProps[i]
    const y = particleProps[i2]
    const n = simplex.noise3D(x * this.xOff, y * this.yOff, tick * this.zOff) * this.noiseSteps * TAU
    const vx = lerp(particleProps[i3], cos(n), 0.5)
    const vy = lerp(particleProps[i4], sin(n), 0.5)
    let life = particleProps[i5]
    const ttl = particleProps[i6]
    const speed = particleProps[i7]
    const x2 = x + vx * speed
    const y2 = y + vy * speed
    const radius = particleProps[i8]
    const hue = particleProps[i9]

    this.drawParticle(x, y, x2, y2, life, ttl, radius, hue)

    life++

    particleProps[i] = x2
    particleProps[i2] = y2
    particleProps[i3] = vx
    particleProps[i4] = vy
    particleProps[i5] = life;

    (this.checkBounds(x, y) || life > ttl) && this.initParticle(i)
  }

  drawParticles() {
    let i

    for (i = 0; i < this.particlePropsLength; i += this.particlePropCount) {
      this.updateParticle(i)
    }
  }

  createCanvas() {
    container = document.querySelector('.flow-canvas')
    if (!container) return

    canvas = {
      a: document.createElement('canvas'),
      b: document.createElement('canvas')
    }
    canvas.b.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `
    container.appendChild(canvas.b)
    ctx = {
      a: canvas.a.getContext('2d') as CanvasRenderingContext2D,
      b: canvas.b.getContext('2d') as CanvasRenderingContext2D
    }
    center = []
  }

  resize() {
    const { innerWidth, innerHeight } = window

    canvas.a.width = innerWidth
    canvas.a.height = innerHeight

    ctx.a.drawImage(canvas.b, 0, 0)

    canvas.b.width = innerWidth
    canvas.b.height = innerHeight

    ctx.b.drawImage(canvas.a, 0, 0)

    center[0] = 0.5 * canvas.a.width
    center[1] = 0.5 * canvas.a.height
  }

  renderGlow() {
    ctx.b.save()
    ctx.b.filter = 'blur(8px) brightness(200%)'
    ctx.b.globalCompositeOperation = 'lighter'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()

    ctx.b.save()
    ctx.b.filter = 'blur(4px) brightness(200%)'
    ctx.b.globalCompositeOperation = 'lighter'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()
  }

  renderToScreen() {
    ctx.b.save()
    ctx.b.globalCompositeOperation = 'lighter'
    ctx.b.drawImage(canvas.a, 0, 0)
    ctx.b.restore()
  }

  draw() {
    if (this.stopAnimation) return

    tick++

    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)

    ctx.b.fillStyle = this.backgroundColor
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height)

    this.drawParticles()
    this.renderGlow()
    this.renderToScreen()

    window.requestAnimationFrame(this.draw)
  }

  setup() {
    this.createCanvas()
    this.resize()
    this.initParticles()
    this.draw()
  }

  render() {
    return <div class="flow-canvas"></div>
  }
}
