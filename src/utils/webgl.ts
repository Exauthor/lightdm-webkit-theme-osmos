/**
 * A basic Web GL class. This provides a very basic setup for GLSL shader code.
 * Currently it doesn't support anything except for clip-space 3d, but this was
 * done so that we could start writing fragments right out of the gate. My
 * Intention is to update it with particle and polygonal 3d support later on.
 *
 * @class WTCGL
 * @author Liam Egan <liam@wethecollective.com>
 * @version 0.0.8
 * @created Jan 16, 2019
 */

type ctxType = WebGL2RenderingContext | WebGLRenderingContext
declare let mat4: any

export interface TextureInterface {
  name: string;
  url: string;
  type: number;
  img: HTMLImageElement | null;
}

export interface TextureWithImageInterface extends Omit<TextureInterface, 'img'> {
  img: HTMLImageElement;
}

export default class WTCGL {
  [x: string]: any
  /**
   * The WTCGL Class constructor. If construction of the webGL context fails
   * for any reason this will return null.
   *
   * @TODO make the dimension properties properly optional
   * @TODO provide the ability to allow for programmable buffers
   *
   * @constructor
   * @param {HTMLElement} el The canvas element to use as the root
   * @param {string} vertexShaderSource The vertex shader source
   * @param {string} fragmentShaderSource The fragment shader source
   * @param {number} [width] The width of the webGL context. This will default to the canvas dimensions
   * @param {number} [height] The height of the webGL context. This will default to the canvas dimensions
   * _ctx@param {number} [pxratio=1] The pixel aspect ratio of the canvas
   * @param {boolean} [styleElement] A boolean indicating whether to apply a style property to the canvas (resizing the canvas by the inverse of the pixel ratio)
   * @param {boolean} [webgl2] A boolean indicating whether to try to create a webgl2 context instead of a regulart context
   */
  // _ctx
  // _el: HTMLCanvasElement

  static TYPE_INT = 0
  static TYPE_FLOAT = 1
  static TYPE_V2 = 2
  static TYPE_V3 = 3
  static TYPE_V4 = 4
  static TYPE_BOOL = 5

  static TEXTYPE_FLOAT = 0
  static TEXTYPE_UNSIGNED_BYTE = 1
  static TEXTYPE_HALF_FLOAT_OES = 2

  static IMAGETYPE_REGULAR = 0
  static IMAGETYPE_TILE = 1
  static IMAGETYPE_MIRROR = 2

  isWebgl2!: boolean
  _ctx!: any
  _el!: HTMLCanvasElement
  _program!: WebGLProgram

  _onRun: () => void
  _vertexShader!: WebGLShader
  _fragmentShader!: WebGLShader
  frameBuffers!: never[]
  _programInfo!: any
  width!: number
  height!: number
  _size!: any// [number, number] | { w: number; h: number }
  _positionBuffer!: WebGLBuffer | null
  _then!: number
  _styleElement!: boolean
  _startTime!: number
  _time!: number
  _includePerspectiveMatrix!: boolean
  _includeModelViewMatrix!: boolean
  _textures!: any[]
  _clearing!: boolean
  _running!: boolean
  _frameRate!: number
  _pxratio!: number

  constructor(
    el: HTMLCanvasElement,
    vertexShaderSource: string,
    fragmentShaderSource: string,
    width: number,
    height: number,
    pxratio: number,
    styleElement?: boolean,
    webgl2?: boolean
  ) {
    this.run = this.run.bind(this)

    this._onRun = () => {
      console.log('RUN ANIMATION')
    }

    // If the HTML element isn't a canvas, return null
    if (!(el instanceof HTMLElement) || el.nodeName.toLowerCase() !== 'canvas') {
      console.log('Provided element should be a canvas element')
      return
    }

    this._el = el
    // The context should be either webgl2, webgl or experimental-webgl
    this.isWebgl2 = webgl2 === true
    const ctx = this._el.getContext('webgl2', this.webglParams) || this._el.getContext('webgl', this.webglParams)

    // We can't make the context so return an error
    if (!ctx) {
      console.log('Browser doesn\'t support WebGL ')
      return
    }

    this._ctx = ctx

    // Set up the extensions
    this._ctx.getExtension('OES_standard_derivatives')
    this._ctx.getExtension('EXT_shader_texture_lod')
    this._ctx.getExtension('OES_texture_float')
    this._ctx.getExtension('WEBGL_color_buffer_float')
    this._ctx.getExtension('OES_texture_float_linear')
    this._ctx.getExtension('EXT_color_buffer_float')

    // Create the shaders
    this._vertexShader = WTCGL.createShaderOfType(this._ctx, this._ctx.VERTEX_SHADER, vertexShaderSource) as WebGLShader
    this._fragmentShader = WTCGL.createShaderOfType(this._ctx, this._ctx.FRAGMENT_SHADER, fragmentShaderSource) as WebGLShader

    // Create the program and link the shaders
    this._program = this._ctx.createProgram() as WebGLProgram
    this._ctx.attachShader(this._program, this._vertexShader)
    this._ctx.attachShader(this._program, this._fragmentShader)
    this._ctx.linkProgram(this._program)

    // If we can't set up the params, this means the shaders have failed for some reason
    if (!this._ctx.getProgramParameter(this._program, this._ctx.LINK_STATUS)) {
      console.log('Unable to initialize the shader program: ' + this._ctx.getProgramInfoLog(this._program))
      return
    }

    // Initialise the vertex buffers
    this.initBuffers([
      -1.0, 1.0, -1.0,
      1.0, 1.0, -1.0,
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0
    ])

    // Initialise the frame buffers
    this.frameBuffers = []

    // The program information object. This is essentially a state machine for the webGL instance
    this._programInfo = {
      attribs: {
        vertexPosition: this._ctx.getAttribLocation(this._program, 'a_position')
      },
      uniforms: {
        projectionMatrix: this._ctx.getUniformLocation(this._program, 'u_projectionMatrix'),
        modelViewMatrix: this._ctx.getUniformLocation(this._program, 'u_modelViewMatrix'),
        resolution: this._ctx.getUniformLocation(this._program, 'u_resolution'),
        time: this._ctx.getUniformLocation(this._program, 'u_time')
      }
    }

    // Tell WebGL to use our program when drawing
    this._ctx.useProgram(this._program)

    this.pxratio = pxratio

    this.styleElement = styleElement !== true

    this.resize(width, height)
  }

  /**
   * Public methods
   */

  addFrameBuffer(w: number, h: number, tiling = 0, buffertype = 0) {
    // create to render to
    const gl = this._ctx
    const targetTextureWidth = w * this.pxratio
    const targetTextureHeight = h * this.pxratio
    const targetTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, targetTexture)
    {
      // define size and format of level 0
      const level = 0
      let internalFormat = gl.RGBA
      const border = 0
      const format = gl.RGBA
      let t
      if (buffertype & WTCGL.TEXTYPE_FLOAT) {
        const e = gl.getExtension('OES_texture_float');
        (window as any).extension = e
        t = e.FLOAT
        // internalFormat = gl.RGBA32F;
      } else if (buffertype & WTCGL.TEXTYPE_HALF_FLOAT_OES) {
        // t = gl.renderer.isWebgl2 ? e.HALF_FLOAT : e.HALF_FLOAT_OES;
        //     gl.renderer.extensions['OES_texture_half_float'] ? gl.renderer.extensions['OES_texture_half_float'].HALF_FLOAT_OES :
        //     gl.UNSIGNED_BYTE;
        const e = gl.getExtension('OES_texture_half_float')
        t = this.isWebgl2 ? gl.HALF_FLOAT : e.HALF_FLOAT_OES
        // format = gl.RGBA;
        if (this.isWebgl2) {
          internalFormat = gl.RGBA16F
        }
        // internalFormat = gl.RGB32F;
        // format = gl.RGB32F;
        // window.gl = gl
        // t = e.HALF_FLOAT_OES;
      } else {
        t = gl.UNSIGNED_BYTE
      }
      const type = t
      const data = null
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        targetTextureWidth, targetTextureHeight, border,
        format, type, data)
      // gl.generateMipmap(gl.TEXTURE_2D);

      // set the filtering so we don't need mips
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)

      // Set the parameters based on the passed type
      if (tiling === WTCGL.IMAGETYPE_TILE) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
      } else if (tiling === WTCGL.IMAGETYPE_MIRROR) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
      } else if (tiling === WTCGL.IMAGETYPE_REGULAR) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      }
    }

    // Create and bind the framebuffer
    const fb = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb)

    // attach the texture as the first color attachment
    const attachmentPoint = gl.COLOR_ATTACHMENT0
    const level = 0
    gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level)

    return {
      w: w * this.pxratio,
      h: h * this.pxratio,
      fb: fb,
      frameTexture: targetTexture
    }
  }

  /**
   * Resizes the canvas to a specified width and height, respecting the pixel ratio
   *
   */
  resize(w: number, h: number) {
    this.width = w
    this.height = h
    this._el.width = w * this.pxratio
    this._el.height = h * this.pxratio
    this._size = [w * this.pxratio, h * this.pxratio]
    if (this.styleElement) {
      this._el.style.width = w + 'px'
      this._el.style.height = h + 'px'
    }

    this._ctx.viewportWidth = w * this.pxratio
    this._ctx.viewportHeight = h * this.pxratio

    this._ctx.uniform2fv(this._programInfo.uniforms.resolution, this._size)

    this.initBuffers(this._positions)
  }

  /**
   * Initialise a provided vertex buffer
   *
   * @param  {array} positions The vertex positions to initialise
   * @return {Void}
   */
  initBuffers(positions: number[]) {
    this._positions = positions
    this._positionBuffer = this._ctx.createBuffer()

    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._positionBuffer)

    this._ctx.bufferData(this._ctx.ARRAY_BUFFER,
      new Float32Array(positions),
      this._ctx.STATIC_DRAW)
  }

  /**
   * Add a uniform to the program. At this time the following types are supported:
   * - Float - WTCGL.TYPE_FLOAT
   * - Vector 2 - WTCGL.TYPE_V2
   * - Vector 3 - WTCGL.TYPE_V3
   * - Vector 4 - WTCGL.TYPE_V4
   *
   * @return {WebGLUniformLocation} The uniform location for later reference
   */
  addUniform(name: string, type: number, value: number | number[]) {
    let uniform = this._programInfo.uniforms[name]
    uniform = this._ctx.getUniformLocation(this._program, `u_${name}`)
    switch (type) {
      case WTCGL.TYPE_INT :
        if (!isNaN(value as number)) this._ctx.uniform1i(uniform, value as number)
        break
      case WTCGL.TYPE_FLOAT :
        if (!isNaN(value as number)) this._ctx.uniform1f(uniform, value as number)
        break
      case WTCGL.TYPE_V2 :
        if (value instanceof Array && value.length === 2.0) this._ctx.uniform2fv(uniform, value)
        break
      case WTCGL.TYPE_V3 :
        if (value instanceof Array && value.length === 3.0) this._ctx.uniform3fv(uniform, value)
        break
      case WTCGL.TYPE_V4 :
        if (value instanceof Array && value.length === 4.0) this._ctx.uniform4fv(uniform, value)
        break
      case WTCGL.TYPE_BOOL :
        if (!isNaN(value as number)) this._ctx.uniform1i(uniform, value as number)
        break
    }
    this._programInfo.uniforms[name] = uniform
    return uniform
  }

  /**
   * Adds a texture to the program and links it to a named uniform. Providing the type changes the tiling properties of the texture. Possible values for type:
   * - WTCGL.IMAGETYPE_REGULAR - No tiling, clamp to edges and doesn't need to be power of 2.
   * - WTCGL.IMAGETYPE_TILE - full x and y tiling, needs to be power of 2.
   * - WTCGL.IMAGETYPE_MIRROR - mirror tiling, needs to be power of 2.
   */
  addTexture(name: string, type: number, image: HTMLImageElement, liveUpdate = false) {
    const texture = this._ctx.createTexture()
    this._ctx.pixelStorei(this._ctx.UNPACK_FLIP_Y_WEBGL, true)
    this._ctx.bindTexture(this._ctx.TEXTURE_2D, texture)

    // this._ctx.generateMipmap(this._ctx.TEXTURE_2D);

    // Set the parameters based on the passed type
    if (type === WTCGL.IMAGETYPE_MIRROR) {
      this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_WRAP_S, this._ctx.MIRRORED_REPEAT)
      this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_WRAP_T, this._ctx.MIRRORED_REPEAT)
    } else if (type === WTCGL.IMAGETYPE_REGULAR) {
      this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_WRAP_S, this._ctx.CLAMP_TO_EDGE)
      this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_WRAP_T, this._ctx.CLAMP_TO_EDGE)
    }

    this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_MIN_FILTER, this._ctx.LINEAR)
    // this._ctx.texParameteri(this._ctx.TEXTURE_2D, this._ctx.TEXTURE_MAG_FILTER, this._ctx.LINEAR);

    // Upload the image into the texture.
    this._ctx.texImage2D(this._ctx.TEXTURE_2D, 0, this._ctx.RGBA, this._ctx.RGBA, this._ctx.UNSIGNED_BYTE, image)

    // add the texture to the array of textures.
    this.pushTexture(name, texture, image, this._ctx.TEXTURE_2D, liveUpdate)

    return texture
  }

  pushTexture(name: any, texture: WebGLTexture | null, image: any, target: number, liveUpdate = false) {
    const textures = this.textures

    textures.push({ name: name, tex: texture, liveUpdate: liveUpdate, image: image, target: target })

    // Finally set the this.textures (this is just to get around the funnyness of default getters)
    this.textures = textures
  }

  /**
   * Updates a texture location for a given WebGLTexture with an image
   */
  updateTexture(texture: WebGLTexture | null, image: TexImageSource, name: any) {
    const uniform = this._ctx.getUniformLocation(this._program, `u_${name}`)
    // Set the texture unit to the uniform
    this._ctx.uniform1i(uniform, 0)
    this._ctx.activeTexture(this._ctx.TEXTURE0)

    this._ctx.bindTexture(this._ctx.TEXTURE_2D, texture)
    // Upload the image into the texture.
    this._ctx.texImage2D(this._ctx.TEXTURE_2D, 0, this._ctx.RGBA, this._ctx.RGBA, this._ctx.UNSIGNED_BYTE, image)
  }

  /**
   * Initialise texture locations in the program
   *
   * @return {Void}
   */
  initTextures() {
    for (let i = 0; i < this.textures.length; i++) {
      const name = this.textures[i].name
      let uniform = this._programInfo.uniforms[name]
      uniform = this._ctx.getUniformLocation(this._program, `u_${name}`)

      // Set the texture unit to the uniform
      this._ctx.uniform1i(uniform, i)

      // find the active texture based on the index
      this._ctx.activeTexture(this._ctx[`TEXTURE${i}`])

      // Finally, bind the texture
      this._ctx.bindTexture(this.textures[i].target, this.textures[i].tex)
    }
  }

  /**
   * The run loop. This function is run as a part of a RaF and updates the internal
   * time uniform (`u_time`).
   *
   * @param  {number} delta The delta time provided by the RaF loop
   * @return {Void}
   */
  run(delta: number) {
    this.running && requestAnimationFrame(this.run)

    const runFunction = () => {
      this.time = this.startTime + delta * 0.0002
      this.onRun()
      this.render()
    }

    if (this.frameRate) {
      const now = Date.now()
      const elapsed = now - this._then

      if (elapsed > this.frameRate) {
        this._then = now - (elapsed % this.frameRate)

        runFunction()
      }
    } else {
      runFunction()
    }
  }

  /**
   * Render the program
   *
   * @return {Void}
   */
  render(buffer: { w?: number; h?: number; fb?: number } = {}) {
    this._ctx.bindFramebuffer(this._ctx.FRAMEBUFFER, buffer.fb || null)
    // Update the time uniform
    this._ctx.uniform1f(this._programInfo.uniforms.time, this.time)

    this.textures.forEach((textureInfo) => {
      if (textureInfo.liveUpdate === true) {
        this.updateTexture(textureInfo.tex, textureInfo.image, textureInfo.name)
      }
    })

    this._ctx.viewport(0, 0, buffer.w || this._ctx.viewportWidth, buffer.h || this._ctx.viewportHeight)
    if (this.clearing) {
      this._ctx.clearColor(1.0, 0.0, 0.0, 0.0)
      // this._ctx.clearDepth(1.0);
      // this._ctx.enable(this._ctx.DEPTH_TEST);
      // this._ctx.depthFunc(this._ctx.LEQUAL);

      this._ctx.blendFunc(this._ctx.SRC_ALPHA, this._ctx.ONE_MINUS_SRC_ALPHA)

      this._ctx.clear(this._ctx.COLOR_BUFFER_BIT)
    }

    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._positionBuffer)
    this._ctx.vertexAttribPointer(
      this._programInfo.attribs.vertexPosition,
      3,
      this._ctx.FLOAT,
      false,
      0,
      0)
    this._ctx.enableVertexAttribArray(this._programInfo.attribs.vertexPosition)

    // Set the shader uniforms
    this.includePerspectiveMatrix && this._ctx.uniformMatrix4fv(this._programInfo.uniforms.projectionMatrix, false, this.perspectiveMatrix)
    this.includeModelViewMatrix && this._ctx.uniformMatrix4fv(this._programInfo.uniforms.modelViewMatrix, false, this.modelViewMatrix)

    this._ctx.drawArrays(this._ctx.TRIANGLE_STRIP, 0, 4)
  }

  /**
   * Getters and setters
   */

  /**
   * The default webGL parameters to be used for the program.
   * This is read only and should only be overridden as a part of a subclass.
   *
   * @readonly
   * @type {object}
   * @default { alpha: true }
   */
  get webglParams(): WebGLContextAttributes {
    return { alpha: true }
  }

  /**
   * (getter/setter) Whether the element should include styling as a part of
   * its rendition.
   *
   * @type {boolean}
   * @default true
   */
  set styleElement(value) {
    this._styleElement = value === true
    if (this._styleElement === false && this._el) {
      this._el.style.width = ''
      this._el.style.height = ''
    }
  }

  get styleElement() {
    return this._styleElement !== false
  }

  /**
   * (getter/setter) startTime. This is a value to begin the `u_time`
   * unform at. This is here in case you want `u_time` to begin at a
   * specific value other than 0.
   *
   * @type {number}
   * @default 0
   */
  set startTime(value) {
    if (!isNaN(value)) {
      this._startTime = value
    }
  }

  get startTime() {
    return this._startTime || 0
  }

  /**
   * (getter/setter) time. This is the time that the program currently
   * sits at. By default this value is set as a part of the run loop
   * however this is a public property so that we can specify time
   * for rendition outside of the run loop.
   *
   * @default 0
   */
  set time(value: number) {
    if (!isNaN(value)) {
      this._time = value
    }
  }

  get time() {
    return this._time || 0
  }

  /**
   * (getter/setter) includePerspectiveMatrix. This determines whether the
   * perspecive matrix is included in the program. This doesn't really make
   * a difference right now, but this is here to provide future interoperability.
   *
   * @type {boolean}
   * @default false
   */
  set includePerspectiveMatrix(value) {
    this._includePerspectiveMatrix = value === true
  }

  get includePerspectiveMatrix() {
    return this._includePerspectiveMatrix === true
  }

  /**
   * (getter/setter) includeModelViewMatrix. This determines whether the
   * model view matrix is included in the program. This doesn't really make
   * a difference right now, but this is here to provide future interoperability.
   *
   * @type {boolean}
   * @default false
   */
  set includeModelViewMatrix(value) {
    this._includeModelViewMatrix = value === true
  }

  get includeModelViewMatrix() {
    return this._includeModelViewMatrix === true
  }

  /**
   * (getter/setter) textures. The array of textures to initialise into the program.
   *
   * @private
   * @type {array}
   * @default []
   */
  set textures(value) {
    if (value instanceof Array) {
      this._textures = value
    }
  }

  get textures() {
    return this._textures || []
  }

  /**
   * (getter/setter) clearing. Specifies whether the program should clear the screen
   * before drawing anew.
   *
   * @type {boolean}
   * @default false
   */
  set clearing(value) {
    this._clearing = value === true
  }

  get clearing() {
    return this._clearing === true
  }

  /**
   * (getter/setter) running. Specifies whether the programming is running. Setting
   * this to true will create a RaF loop which will call the run function.
   *
   * @type {boolean}
   * @default false
   */
  set running(value) {
    if (!this.running && value === true) {
      this._then = Date.now()

      requestAnimationFrame(this.run)
    }
    this._running = value === true
  }

  get running() {
    return this._running === true
  }

  set frameRate(value: number) {
    if (!isNaN(value)) this._frameRate = 1000 / value
  }

  get frameRate() {
    return this._frameRate || 0
  }

  /**
   * (getter/setter) pxratio. The 1-dimensional pixel ratio of the application.
   * This should be used either for making a program look good on high density
   * screens or for raming down pixel density for performance.
   *
   * @default 1
   */
  set pxratio(value: number) {
    if (value > 0) this._pxratio = value
  }

  get pxratio() {
    return this._pxratio || 1
  }

  /**
   * (getter/setter) perspectiveMatrix. Calculate a perspective matrix, a
   * special matrix that is used to simulate the distortion of perspective in
   * a camera. Our field of view is 45 degrees, with a width/height ratio
   * that matches the display size of the canvas and we only want to see
   * objects between 0.1 units and 100 units away from the camera.
   *
   * @readonly
   * @type {mat4}
   */
  get perspectiveMatrix() {
    const fieldOfView = 45 * Math.PI / 180 // in radians
    const aspect = this._size.w / this._size.h
    const zNear = 0.1
    const zFar = 100.0
    const projectionMatrix = mat4.create()
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
      fieldOfView,
      aspect,
      zNear,
      zFar)

    return projectionMatrix
  }

  /**
   * (getter/setter) perspectiveMatrix. Calculate a model view matrix.
   *
   * @readonly
   * @type {mat4}
   */
  get modelViewMatrix() {
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create()

    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    mat4.translate(modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [-0.0, 0.0, -1.0]) // amount to translate

    return modelViewMatrix
  }

  set onRun(runMethod) {
    if (typeof runMethod === 'function') {
      this._onRun = runMethod.bind(this)
    }
  }

  get onRun() {
    return this._onRun
  }

  get context() {
    return this._ctx || null
  }

  /**
   * Static Methods
   */

  /**
   * Create a shader of a given type given a context, type and source.
   *
   */
  static createShaderOfType(ctx: ctxType, type: GLenum, source: string) {
    const shader = ctx.createShader(type)

    if (!shader) { return null }

    ctx.shaderSource(shader, source)
    ctx.compileShader(shader)

    if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
      console.log('An error occurred compiling the shaders: ' + ctx.getShaderInfoLog(shader))
      ctx.deleteShader(shader)
      return null
    }

    return shader
  }
}
