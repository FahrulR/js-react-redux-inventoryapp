import React, { Component } from 'react'
import { Link2, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Form, Modal } from 'react-bootstrap'

import {register} from '../publics/actions/users'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

class formRegister extends Component {
  constructor (props) {
    super(props)

    this.state = {
      style: props.style,
      formData: {
        username: '',
        fullname: '',
        email: '',
        password: ''  
      },
      history: props.history
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose = () => {
    this.setState({showModal: false})
    if (this.state.redirectOnCloseModal)
    this.props.history.push('/')
  }

  handleChange = (event) => {
    let newFormData = {...this.state.formData}
    const target = event.target
    const name = target.name
    const value = target.value
    newFormData[name] = value
    this.setState({
      formData: newFormData
    },()=>{console.log(this.state.formData)})
  }
  

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch(register(this.state.formData))
      .then(res => {
        this.setState({
          showModal: true,
          modalTitle:"Success Register",
          modalMessage: res.action.payload.data.message,
          redirectOnCloseModal: true
        })
      })
      .catch(()=>{
        this.setState({
          showModal:true,
          modalTitle:"Failed Register",
          modalMessage: this.props.users.errMessage
        })
      })
      
  }

  render () {
    const {username, fullname, email, password } = this.state.formData;
    const isEnabled = username.length > 0 && fullname.length > 0  && email.length > 0 && password.length;
    return (
      <Grid container component="main" styles={{height: '100%'}}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',}} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{margin:'70px 75px', display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'}}>
          <Avatar style={{margin: '2px', backgroundColor: 'grey'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form style={{width: '100%', marginTop: '8px'}} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              autoComplete="username"
              autoFocus
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              value={this.state.fullname}
              onChange={this.handleChange}
              autoComplete="fullname"
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="email"
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{margin: '24px 0px 16px'}}
              disabled= {!isEnabled}
            >
              Sign Up
            </Button>
            <Grid container>
            <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          Inventory App
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
            </Box>
          </form>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title>{this.state.modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.state.modalMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="warning" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>
        </div>
      </Grid>
    </Grid>
    )
  }
}

const mapStateToProps = state => {
  return{
    users: state.users
  }
}

export default connect(mapStateToProps)(formRegister)
