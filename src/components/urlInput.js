import React from 'react'
import {
  TextField,
  InputAdornment,
  Button,
  withStyles 
} from '@material-ui/core'

const styles = theme => ({
  field: {
    marginLeft: theme.spacing.unit,
    merginRight: theme.spacing.unit,
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit
  }
})

class URLInput extends React.Component {
  
  renderMakeBtn() {
    return (
      <Button
        className={this.props.classes.button}
        variant='contained'
        color='primary'
        size='medium'
        onClick={this.props.onBtnClick}>
        Make
      </Button>
    )
  }

  render() {
    const { props } = this
    return (
      <TextField
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        className={[props.classes.field, props.className]}
        margin='normal'
        label='Enter a URL'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {this.renderMakeBtn()}
            </InputAdornment>
          )
        }}>
      </TextField>
    )
  }
}

export default withStyles(styles)(URLInput)