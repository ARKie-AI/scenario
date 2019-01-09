import { Grid } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { Scenario } from '../../model/scenario.model'
import { ScenarioInputs } from '../scenario/scenario.inputs'
import { PosterList } from './poster.list'

interface PosterEditorProps {
  selected?: Scenario
}

@inject((store: any) => ({
  selected: store.scenarios.selected,
}))
@observer
export class PosterEditor extends React.Component<PosterEditorProps> {
  render() {
    const { selected } = this.props
    if (!selected) return null
    return (
      <Grid container wrap="nowrap">
        <Grid item container wrap="nowrap" style={{ minWidth: 320, maxWidth: 400 }}>
          <ScenarioInputs />
        </Grid>
        <Grid item container wrap="nowrap" style={{ padding: '20px 0' }}>
          <PosterList />
        </Grid>
      </Grid>
    )
  }
}
