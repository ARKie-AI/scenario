import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

import Config from '../../config'
import { wait } from '../utils'

@inject((store: any) => ({
  selected: store.scenarios.selected,
  list: store.scenarios.list,
  getList: store.scenarios.fetchList,
  getOne: store.scenarios.fetchScenarioById,
  onSelected: store.scenarios.selectScenario,
  nextStep: store.process.changeStep,
}))
@observer
export class ScenarioList extends React.Component<any, any> {
  private handleChange = async (e: any) => {
    const { onSelected, nextStep } = this.props
    onSelected && onSelected(e.target.value)
    await wait(1)
    nextStep && nextStep(2)
  }

  private renderSelect() {
    const { list = [], selected } = this.props
    console.info('select:', selected)
    return (
      <SelectContainer variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">请选择需要的场景</InputLabel>
        <Select
          value={selected ? selected.id : ''}
          onChange={this.handleChange}
          input={<OutlinedInput name="age" labelWidth={150} id="outlined-age-native-simple" />}
        >
          {list.map((item: any) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </SelectContainer>
    )
  }

  componentDidMount() {
    const { getList, getOne } = this.props
    getOne && getOne(Config.SCENARIO_ID)
    return
    getList && getList()
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={6} container direction="column" style={{ padding: '50px 0', maxWidth: 400 }}>
          {this.renderSelect()}
        </Grid>
      </Grid>
    )
  }
}

const SelectContainer = styled(FormControl)``
