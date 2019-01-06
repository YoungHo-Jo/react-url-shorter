import React, { Component } from 'react';
import MSnackbar from './components/snackbar'
import HistoryList from './components/historyList'
import URLInput from './components/urlInput'
import {
  withStyles
} from '@material-ui/core'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  titleContainer: {
    marginTop: '10%'
  },
  historyContainer: {
    alignItems: 'center',
    marginTop: '30px',
    width: '60%'
  },
  inputContainer: {
    width: '70%',
    marginTop: '30px'
  }
})

function updateHistory(historyArr) {
  localStorage.setItem('history', JSON.stringify(historyArr))
}

function getHistory() {
  if(localStorage.hasOwnProperty('history')) {
    try {
      var history = JSON.parse(localStorage.getItem('history'))

      if(history == null) throw Error

      return history
    } catch(e) {
      return []
    }
  } else return []
}


class App extends Component {
  state = {
    url: '',
    shortUrl: null,
    history: [],
    snackbar: false,
    snackbarType: 'error',
    snackbarMessage: ''
  }

  componentDidMount() {
    // get the history from the local storage
    this.setState({
      history: getHistory()
    })

    // update the history before the page unload
    window.addEventListener(
      'beforeunload',
      () => {
        updateHistory(this.state.history)
      }
    )
  }

  showSnackbar(type, message) {
    this.setState({
      snackbar: true,
      snackbarType: type,
      snackbarMessage: message  
    }) 
  }

  onUrlInputChange = e => {
    this.setState({
      url: e.target.value 
    })
  }

  onMakeClick = e => {
    const { url } = this.state
    if(url === '') {
      // no input 
      // toast a message that recommend to enter the URL
      this.setState({
        snackbar: true,
        snackbarType: 'error',
        snackbarMessage: 'Please enter the URL you want'
      })
      return 
    } else {
      // request to make a short url for this url 
      fetch('/api/short', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          url: url
        })
      })
      .then(res => res.json())
      .then(json => {
        console.log(this.state)
        this.state.history.unshift({
          originUrl: url,
          shortUrl: json.shortUrl
        })

        return this.setState({
          shortUrl: json.shortUrl,
        })
      })
      .then(() => {
        updateHistory(this.state.history)
        this.showSnackbar('success', 'Success')
      })
      .catch(err => console.log(err))
    }
  }

  onUrlInputEnter = e => {
    if(e.key === 'Enter') this.onMakeClick(e)
  }
  
  renderTitle() {
    return (
      <div>
        <h2>Make a short URL</h2>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    
    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          {this.renderTitle()}
        </div>
        <div className={classes.inputContainer}>
          <URLInput
            onChange={this.onUrlInputChange}
            onKeyPress={this.onUrlInputEnter}
            onBtnClick={this.onMakeClick}/>
        </div>
        <div className={classes.historyContainer}>
          <HistoryList 
            history={this.state.history}
            onCopyClick={() => {
              this.showSnackbar('success', 'Copied Successfully')
            }}/>
        </div>

        <MSnackbar
          type={this.state.snackbarType}
          message={this.state.snackbarMessage}
          open={this.state.snackbar}
          onCloseClick={() => this.setState({
            snackbar: false
          })}
          onClose={() => {
            this.setState({
              snackbar: false
            })
          }}/>

      </div>
    )
  }
}

export default withStyles(styles)(App);
