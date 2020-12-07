declare module 'parallax-js' {
  export default class Parallax {
    private inputElement?: string | HTMLElement | null;
    private calibrateX?: boolean;
    private calibrateY?: boolean;
    private invertX?: boolean;
    private invertY?: boolean;
    private limitX?: number | false;
    private limitY?: number | false;
    private scalarX?: number;
    private scalarY?: number;
    private frictionX?: number;
    private frictionY?: number;
    private originX?: number;
    private originY?: number;

    public precision?: number;
    public relativeInput?: boolean;
    public clipRelativeInput?: boolean;
    public pointerEvents?: boolean;
    public hoverOnly?: boolean;
    public selector?: string | null;
    public onReady?: () => void;

    constructor(element: HTMLElement, options?: ParallaxOptions);

    public enable(): void;
    public disable(): void;
    public destroy(): void;
    public version(): void;
    public setInputElement(element: string | HTMLElement | null): void;
    public calibrate(x: boolean, y: boolean): void;
    public invert(x: boolean, y: boolean): void;
    public limit(x: number | false, y: number | false): void;
    public scalar(x: number, y: number): void;
    public friction(x: number, y: number): void;
    public origin(x: number, y: number): void;
  }

  export interface ParallaxOptions {
    precision?: number;
    relativeInput?: boolean;
    clipRelativeInput?: boolean;
    hoverOnly?: boolean;
    inputElement?: string | HTMLElement | null;
    pointerEvents?: boolean;
    calibrateX?: boolean;
    calibrateY?: boolean;
    invertX?: boolean;
    invertY?: boolean;
    limitX?: number | false;
    limitY?: number | false;
    scalarX?: number;
    scalarY?: number;
    frictionX?: number;
    frictionY?: number;
    originX?: number;
    originY?: number;
    selector?: string | null;
    onReady?: () => void;
  }
}
