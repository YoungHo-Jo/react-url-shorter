import React from 'react'
import PropTypes from 'prop-types'
import {
  SnackbarContent,
  Snackbar,
  IconButton,
  withStyles
} from '@material-ui/core'
import {
  Close,
  Error,
  CheckCircle
} from '@material-ui/icons'
import  {
  green
} from '@material-ui/core/colors'

const styles = theme => ({
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
})

const icons = {
  success: CheckCircle,
  error: Error
}

class MSnackbar extends React.Component {
  propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    open: PropTypes.bool,
    onCloseClick: PropTypes.func
  }


  renderContent() {
    const { className, classes, message, onCloseClick, type, ...others } = this.props
    const Icon = icons[type]
    
    return (
      <SnackbarContent
        className={[classes[type], className]}
        aria-describedby='client-snackbar'
        message={
          <span id='client-snackbar' className={classes.message}>
           <Icon className={[classes.icon, classes.iconVariant]}/>
           {message}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onCloseClick}>
            <Close className={classes.icon}/>
          </IconButton>
        ]}
        {...others}>
      </SnackbarContent>
    )

  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left' 
        }}
        open={this.props.open}
        autoHideDuration={2000}
        onClose={this.props.onClose}>
        {this.renderContent()}
      </Snackbar>    
    )
  }
}

export default withStyles(styles)(MSnackbar)








