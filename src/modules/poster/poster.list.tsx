import { Grid, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { Poster, PosterStatus } from '../../model/posters'

interface PosterListProps {
  list?: Poster[]
  deletePoster?: (posterId: string) => void
}

@inject((store: any) => ({
  list: store.posters.list,
  deletePoster: store.posters.delete,
}))
@observer
export class PosterList extends React.Component<PosterListProps> {
  private handleClick(id: string) {
    const { deletePoster } = this.props
    deletePoster && deletePoster(id)
  }

  private renderItems() {
    const { list = [] } = this.props
    return (
      <Grid container spacing={24}>
        {list.map((item) => {
          const { url, posterId, status } = item
          return (
            <Grid item key={posterId} xs={12} md={6} lg={2} style={{ position: 'relative' }}>
              <Grid container style={{ position: 'absolute', top: 0, left: 0, height: 50 }} justify="flex-end">
                {status === PosterStatus.CREATED && (
                  <IconButton aria-label="Delete" onClick={() => this.handleClick(posterId)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Grid>
              <img src={url} style={{ width: '100%' }} />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  render() {
    return <>{this.renderItems()}</>
  }
}
