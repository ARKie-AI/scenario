import Config from '../config'
import { OpenApiClient } from './api-client/client'

export class HttpService {
  static _instance: HttpService
  static get instance() {
    if (!this._instance) {
      this._instance = new HttpService()
    }
    return this._instance
  }

  get client(): OpenApiClient {
    return new OpenApiClient(Config.ACCESS_KEY_ID, Config.ACCESS_KEY_SECRET)
  }
}

export function getScenarios() {
  const url = `${Config.ENDPOINT}/v1/scenario`
  return HttpService.instance.client.get(url)
}

export function getScenarioById(id: string) {
  const url = `${Config.ENDPOINT}/v1/scenario`
  return HttpService.instance.client.get(`${url}/${id}`)
}

export function getTemplatesByscenarioId(id: string) {
  const url = `${Config.ENDPOINT}/v1/scenario`
  return HttpService.instance.client.get(`${url}/${id}/template`)
}

export function createPoster(data: any) {
  const url = `${Config.ENDPOINT}/v1/poster`
  return HttpService.instance.client.post(url, data)
}

export function deletePoster(posterId: string) {
  const url = `${Config.ENDPOINT}/v1/poster`
  return HttpService.instance.client.delete(`${url}/${posterId}`)
}

export function searchImage(query = 'keyword=天空&limit=5') {
  const url = `${Config.ENDPOINT}/v1/image`
  return HttpService.instance.client.get(`${url}?${query}`)
}

export function uploadImage(data: any, option: any) {
  const url = `${Config.ENDPOINT}/v1/image/upload`
  return HttpService.instance.client.post(`${url}`, data, option)
}
