import { action, computed, observable } from 'mobx'

class Process {
  @observable private _curStep = 2

  @action.bound
  changeStep(step: number) {
    this._curStep = step
  }

  @computed
  get step() {
    return this._curStep
  }
}

export const process = new Process()
