import { AppBar, Tab, Tabs } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

interface navigationProps {
  step?: 1 | 2 | 3
  onStepChange?: (step?: number) => void
  scenario?: any
}

@inject((store: any) => ({
  step: store.process.step,
  scenario: store.scenarios.selected,
  onStepChange: store.process.changeStep,
}))
@observer
export class Navigation extends React.Component<navigationProps> {
  private handleChange = (e: any, value: number) => {
    const { onStepChange } = this.props
    onStepChange && onStepChange(value + 1)
  }

  renderInputStep() {
    const { scenario } = this.props
    const disabled = scenario ? false : true
    return <Tab label="选择输入" disabled={disabled} />
  }
  render() {
    const { step = 1 } = this.props
    return (
      <AppBar position="static" color="default">
        <Tabs value={step - 1} onChange={this.handleChange} indicatorColor="primary" textColor="primary" fullWidth>
          <Tab label="选择场景" disabled />
          {this.renderInputStep()}
          <Tab label="我的作品" disabled />
        </Tabs>
      </AppBar>
    )
  }
}
