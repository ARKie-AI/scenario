import { concat, find, isEmpty, shuffle } from 'lodash'
import { action, computed, observable, toJS } from 'mobx'

import * as CORE from '../interface'
import { getTemplatesByscenarioId } from '../services/http'

export class Scenario {
  @observable private _inputs: CORE.UserInput[] = []

  @observable private _templates: Array<{ id: string; size: { width: number; height: number } }> = []

  private templateStack: any = []

  private id = ''

  constructor(data: CORE.Scenario) {
    if (data) {
      this.parseScenarioData(data)
    }
  }

  private parseScenarioData(data: CORE.Scenario) {
    const { inputs = [], id } = data

    this._inputs = inputs.map((item) => {
      if (item.type === 'text') {
        return { ...item, text: item.placeholder || '' }
      }
      return item
    })
    this.id = id
  }

  private findTemplate() {
    if (isEmpty(this.templateStack)) {
      this.templateStack = concat(toJS(this._templates)
    }
    this.templateStack = shuffle(this.templateStack)
    return this.templateStack.pop()
  }

  @action
  updateInputById(id: string, props: any) {
    const input = find(this._inputs, { id })
    if (input) {
      Object.assign(input, { ...props })
    }
  }

  @action
  async fetchTemplates() {
    try {
      const templates = await getTemplatesByscenarioId(this.id).then((response: any) => response.data.data)
      this._templates = templates
    } catch (e) {
      this._templates = []
    }
  }

  async getTemplate() {
    if (isEmpty(this._templates)) {
      await this.fetchTemplates()
    }
    return this.findTemplate()
  }

  @computed
  get inputs() {
    return this._inputs
  }
}
