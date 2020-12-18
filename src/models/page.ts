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

export interface AppMenu {
  view: boolean;
  position: AppMenuPosition;
  items: AppMenuItem[] | string[];
  handler?: (value: any) => void;
}

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
