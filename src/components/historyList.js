import React from 'react'
import PropTypes from 'prop-types'
import {
  ListItem,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  CardActions,
  withStyles
} from '@material-ui/core'
import copy  from 'copy-to-clipboard'


const styles = theme => ({
  card: {
    width: '100%'
  },
  linkText: {
    color: '#000000'
  },
  shortUrlText: {
    fontSize: '18px'
  }
})

const host = 'http://localhost/'

class HistoryList extends React.Component {
  propTypes = {
    history: PropTypes.array.isRequired,
    onCopyClick: PropTypes.func
  }

  onCopyClick = (e, id) => {
    copy(host + this.props.history[id].shortUrl)
    if(this.props.onCopyClick) this.props.onCopyClick()
  }
  
  renderCard(origin, short, id) {
    const { classes } = this.props
    
    return (
      <ListItem key={id}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              component='p'
              className={classes.shortUrlText}
              >
              <a href={host + short} className={classes.linkText}>
                {short}
              </a>
            </Typography>
            <Typography color="textSecondary">
              {origin}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size='medium'
              onClick={e => this.onCopyClick(e, id)}>
              Copy
            </Button>
          </CardActions>
        </Card>
      </ListItem>
    )
  }

  render() {
    return (
      <List>
        {
          this.props.history.map((obj, idx) => {
            return this.renderCard(obj.originUrl, obj.shortUrl, idx)
          })
        }
      </List>
    )
  }
}


export default withStyles(styles)(HistoryList)

