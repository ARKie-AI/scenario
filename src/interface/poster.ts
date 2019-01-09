export interface PosterCreateInput {
  scenarioId: string
  template?: string[]
  inputs?: UserInput[]
}

export interface Poster {
  id: string
  name: string
  templateId: string
  scenarioId: string
  owner: string
  size: Size
  url?: string
  createdAt: string
  updatedAt: string
}

export type UserInput = TextInput | ImageInput

export interface TextInput extends InputBase {
  type: 'text'
  text?: string
  placeholder?: string
  ctx?: { [key: string]: any }
}

export interface ImageInput extends InputBase {
  type: 'image'
  imageType: 'avatar' | 'content' | 'QR' | 'logo'
  source: string
  url?: string
}

export interface InputBase {
  id: string
  code?: string
  type: 'text' | 'image'
  label?: string
  groupId?: string
  groupName?: string
}

export interface Size {
  width?: number
  height?: number
  unit?: string
}
