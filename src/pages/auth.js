import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import FormLogin from '../components/formLogin'
import FormRegister from '../components/formRegister'

class auth extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.isLoggedIn()
    }
    if(this.isLoggedIn())
      props.history.push('/')
  }

  isLoggedIn(){
    return window.localStorage.getItem('token')
  }

  render () {
    return (
      <div>
          <Route
            path={'/login'}
            render={() => {
              return (
                this.state.loggedIn ? this.props.history.push('/')
                  : <div>
                    <FormLogin />
                  </div>
              )
            }}
          />
          <Route
            path={'/register'}
            render={() => {
              return (
                  <div>
                    <FormRegister history={this.props.history}/>
                  </div>
              )
            }}
          />
          <br />
        </div>
    )
  }
}

export default auth
