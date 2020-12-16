import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import store from '@/store/index'
import { AppTimestamp } from '@/models/app'

export type InteractiveBlocIds = 'login' | 'settings'

export interface InteractiveBlock {
  id: InteractiveBlocIds;
  openAfterDestroy?: string[];
  closeBeforeMount?: string[];
}

export interface PageState {
  time: AppTimestamp;
  activeBlocks: InteractiveBlock[];
  interactiveBlocks: InteractiveBlock[];
}

@Module({ dynamic: true, store, name: 'page' })
class Page extends VuexModule implements PageState {
  time: AppTimestamp = {
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  activeBlocks: InteractiveBlock[] = []
  interactiveBlocks: InteractiveBlock[] = []

  get getBlock() {
    return (id: string) => {
      return this.activeBlocks.find((activeBlock) => id === activeBlock.id)
    }
  }

  get isOpenBlock() {
    return (id: string) => {
      return !!this.getBlock(id)
    }
  }

  // getCurrentModal: ({ activeModal }) => {
  //   return modals.find(({ id }) => id === activeModal)
  // }

  get timeArray() {
    const { hours, minutes, seconds } = this.time
    return [hours, minutes, seconds]
  }

  get activeBlock(): InteractiveBlock | null {
    return this.activeBlocks.slice(-1)[0]
  }

  @Mutation
  SET_STATE_PAGE<S extends this, K extends keyof this>({
    key,
    value
  }: {
    key: K;
    value: S[K];
  }) {
    this[key] = value
  }

  @Mutation
  OPEN_ACTIVE_BLOCK(id: string) {
    const activeBlock = this.interactiveBlocks.find((block) => block.id === id)
    if (activeBlock) {
      this.activeBlocks.push(activeBlock)
    }
  }

  @Mutation
  CLOSE_ACTIVE_BLOCK(idBlock?: string) {
    const index = this.activeBlocks.findIndex(({ id }) => id === idBlock)

    if (index !== -1) {
      this.activeBlocks.splice(index, 1)
    } else if (!idBlock) {
      this.activeBlocks.pop()
    }
  }

  @Mutation
  CLOSE_ALL_ACTIVE_BLOCK() {
    this.activeBlocks = []
  }

  @Mutation
  UPDATE_TIME(time: AppTimestamp) {
    this.time = Object.assign(this.time, time)
  }

  @Action
  async openBlock(settings: { id: string }) {
    settings = settings || {}
    const { id } = settings
    if (!id) { return }

    // Already active block
    if (this.activeBlocks.find((block) => block.id === id)) { return }

    const block = this.interactiveBlocks.find((block) => block.id === id)
    if (!block) { return }

    const closeBlocks = block.closeBeforeMount

    if (closeBlocks) {
      closeBlocks.forEach((id) => this.CLOSE_ACTIVE_BLOCK(id))
    }

    this.OPEN_ACTIVE_BLOCK(id)
  }

  @Action
  async closeBlock(settings?: { id?: string }) {
    settings = settings || {}
    const id = settings.id || this.activeBlocks.slice(-1)[0].id
    if (!id) { return }

    const block = this.activeBlocks.find((block) => block.id === id)
    if (!block) { return }

    const openBlocks = block.openAfterDestroy

    if (openBlocks) {
      openBlocks.forEach((id) => this.OPEN_ACTIVE_BLOCK(id))
    }

    this.CLOSE_ACTIVE_BLOCK(id)
  }

  @Action
  setTime() {
    const getTimeObject = (): AppTimestamp => {
      const date = new Date()
      return {
        day: date.getDate(),
        seconds: date.getSeconds(),
        minutes: date.getMinutes(),
        hours: date.getHours()
      }
    }

    const updateTimeStage = () => this.UPDATE_TIME(getTimeObject())
    updateTimeStage()

    setTimeout(() => {
      updateTimeStage()
      setInterval(updateTimeStage, 60000)
    }, (60 - getTimeObject().seconds) * 1000)
  }
}

export const PageModule = getModule(Page)