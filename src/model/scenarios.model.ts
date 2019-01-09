import { find } from 'lodash'
import { action, computed, observable } from 'mobx'

import * as CORE from '../interface'
import { getScenarioById, getScenarios } from '../services/http'
import { Scenario } from './scenario.model'

class Scenarios {
  @observable.ref private _list = []

  @observable.ref private curScenario?: any

  @action.bound
  async fetchList() {
    try {
      const list = await getScenarios().then((response: any) => response.data.data)
      if (list) {
        this._list = list
      }
    } catch (e) {
      return
    }
  }

  @action.bound
  async fetchScenarioById(id: string) {
    try {
      const scenario = await getScenarioById(id).then((response: any) => response.data.data)
      if (scenario) {
        this.curScenario = new Scenario(scenario)
      }
    } catch (e) {
      return
    }
  }

  @action.bound
  selectScenario(id: string) {
    const scenario = find<CORE.Scenario>(this._list, { id })
    if (scenario) {
      this.curScenario = new Scenario(scenario)
    }
  }

  @action.bound
  updateInput(id: string, props: any) {
    const scenario = this.selected
    if (scenario) {
      scenario.updateInputById(id, props)
    }
  }

  @computed
  get list() {
    return this._list
  }

  @computed
  get selected() {
    return this.curScenario
  }
}

export const scenarios = new Scenarios()
