import 'antd/dist/antd.css'

import { CssBaseline, Grid } from '@material-ui/core'
import { Provider } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

import { store } from './model'
import { Navigation } from './modules/steps/navigation'
import { StepContainer } from './modules/steps/steps.container'

const App = () => (
  <Provider {...store}>
    <Wrapper container direction="column" wrap="nowrap">
      <CssBaseline />
      <Navigation />
      <StepContainer />
    </Wrapper>
  </Provider>
)

const Wrapper = styled(Grid)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
`

export { App }