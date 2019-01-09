import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './app'

class Main {
  static bootstrap() {
    return new Main()
  }
  constructor() {
    this.init()
  }

  private init() {
    const root: HTMLElement = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body.appendChild(root)
    ReactDOM.render(<App />, root)
  }
}

export { Main }
