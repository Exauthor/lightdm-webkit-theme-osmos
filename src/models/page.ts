export type InteractiveBlockIds = 'login' | 'settings'
export type LoginPosition = 'top' | 'left' | 'right' | 'bottom' | 'center'

export interface InteractiveBlock {
  id: InteractiveBlockIds;
  openAfterDestroy?: InteractiveBlockIds[];
  closeBeforeMount?: InteractiveBlockIds[];
}

export interface PageTimestamp {
  day: number;
  seconds: number;
  minutes: number;
  hours: number;
}

export interface AppMenuMain {
  view: boolean;
  items: AppMenuItem[];
  handler?: (value: any) => void;
  node?: HTMLElement;
  position?: null;
}

export interface AppMenuNode extends AppMenuMain {
  view: boolean;
  node: HTMLElement;
  handler?: (value: any) => void;
}

export interface AppMenuPositionded extends Omit<AppMenuNode, 'node' | 'position'> {
  node?: null;
  position: AppMenuPosition;
}

export type AppMenu = AppMenuNode | AppMenuPositionded

export interface AppMenuItem {
  text: string;
  value: any;
  icon?: string;
}

export interface AppMenuPosition {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
}
