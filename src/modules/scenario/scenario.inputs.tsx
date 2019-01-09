import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { ImageInput, TextInput } from '../../../src/interface'
import { Scenario } from '../../model/scenario.model'
import { searchImage } from '../../services/http'
import { ImageItem } from './ImageItem'

interface ScenarioInputsProps {
  selected?: Scenario
  create?: () => void
  updateInput?: (id: string, props: any) => void
}

@inject((store: any) => ({
  selected: store.scenarios.selected,
  create: store.posters.create,
  updateInput: store.scenarios.updateInput,
}))
@observer
export class ScenarioInputs extends React.Component<ScenarioInputsProps> {
  private handleChange = async (id: string, props: any) => {
    console.info('e:', id, props)
    const { updateInput } = this.props
    updateInput && updateInput(id, props)
  }

  private handleClick = () => {
    const { create } = this.props
    create && create()
  }

  private handleSearch = () => {
    searchImage().then((response) => console.info(response))
  }

  private renderTextInputs() {
    const { selected } = this.props
    if (!selected) return null
    const { inputs = [] } = selected
    console.info('select:', selected)
    return (
      <>
        {inputs
          .filter((item) => item.type === 'text')
          .map(($input) => {
            const input = $input as TextInput
            return (
              <TextField
                key={input.id}
                label={input.label}
                defaultValue={input.placeholder || input.text || ''}
                variant="outlined"
                margin="normal"
                value={input.text}
                onChange={(e: any) => this.handleChange(input.id, { text: e.currentTarget.value })}
              />
            )
          })}
      </>
    )
  }

  private renderImageInputs() {
    const { selected } = this.props
    if (!selected) return null
    const { inputs = [] } = selected
    return (
      <>
        {inputs
          .filter((item) => item.type === 'image')
          .map(($input) => {
            const input = $input as ImageInput
            return (
              <Paper>
                <ImageItem input={input} onChangeCompleted={this.handleChange} />
              </Paper>
            )
          })}
      </>
    )
  }

  private renderCreateButton() {
    return (
      <Button variant="contained" color="primary" onClick={this.handleClick}>
        来一张
      </Button>
    )
  }

  private renderSearch() {
    return (
      <Button variant="contained" color="primary" onClick={this.handleSearch} style={{ margin: '10px 0' }}>
        搜图
      </Button>
    )
  }

  render() {
    return (
      <Grid container wrap="nowrap" direction="column" style={{ padding: 20 }}>
        {this.renderTextInputs()}
        {this.renderImageInputs()}
        {false && this.renderSearch()}
        {this.renderCreateButton()}
      </Grid>
    )
  }
}
