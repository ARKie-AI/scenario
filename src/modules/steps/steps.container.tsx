import { inject, observer } from 'mobx-react'
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'

import { PosterEditor } from '../poster/poster.editor'
import { ScenarioList } from '../scenario/scenario.list'

interface StepContainerProps {
  step?: number
}

@inject((store: any) => ({
  step: store.process.step,
}))
@observer
export class StepContainer extends React.Component<StepContainerProps> {
  private handleChangeIndex = () => {}
  render() {
    const { step = 1 } = this.props
    return (
      <SwipeableViews axis={'x'} index={step - 1} onChangeIndex={this.handleChangeIndex}>
        <ScenarioList />
        <PosterEditor />
        <ItemContainer>Item Three</ItemContainer>
      </SwipeableViews>
    )
  }
}

const ItemContainer = styled.div``
