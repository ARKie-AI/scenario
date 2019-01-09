import { action, computed, observable } from 'mobx'
import { v4 } from 'uuid'

import { createPoster, deletePoster } from '../services/http'
import { scenarios } from './scenarios.model'

class Posters {
  @observable private _list: Poster[] = []

  private deleteIdCache: Map<string, string> = new Map()

  @action
  private updateList(posterId: string, props: any) {
    this._list = this._list.map((item) => {
      if (item.posterId === posterId) {
        return { ...item, ...props, posterId: props.id || posterId }
      }
      return item
    })
  }

  @action.bound
  async create() {
    const { selected: scenario } = scenarios
    if (!scenario) return
    const { id, inputs } = scenario
    const posterId = v4()
    const { id: templateId } = await scenario.getTemplate()
    this._list.push({ posterId, status: PosterStatus.CREATING })
    createPoster({ scenarioId: id, inputs, template: [templateId] })
      .then((response: any) => response.data.data)
      .then((posterData) => this.updateList(posterId, { ...posterData, status: PosterStatus.CREATED }))
  }

  @action.bound
  async delete(posterId: string) {
    if (this.deleteIdCache.has(posterId)) return
    this.deleteIdCache.set(posterId, 'deleting')
    try {
      await deletePoster(posterId)
      this.deleteIdCache.delete(posterId)
      this._list = this._list.filter((item) => item.posterId !== posterId)
    } catch (e) {
      return
    } finally {
      this.deleteIdCache.delete(posterId)
    }
  }

  @computed
  get list() {
    return this._list
  }
}

export enum PosterStatus {
  CREATING,
  CREATED,
}
export interface Poster {
  posterId: string
  url?: string
  status?: PosterStatus
  size?: { width: number; height: number; unit?: string }
  [key: string]: any
}

export const posters = new Posters()
