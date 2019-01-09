import { Size, UserInput } from './poster'

export interface Scenario {
  id: string
  name: string
  sizes?: Size[]
  inputs?: UserInput[]
  createAt?: string
  updateAt?: string
}

export interface ScenarioQuery {
  platforms?: string
  status?: string
  name?: string
  sassType?: string
}
