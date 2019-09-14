import React from 'react'
import { Link2, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import { Form, Modal } from 'react-bootstrap'
import {login} from '../../publics/actions/users'
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


class formLogin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      style: props.style,
      email: '',
      password:'',
      loggedIn:false,
      showModal:false,
      modalTitle:'',
      modalMessage:''
  }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose = () => {
    this.setState({showModal: false})
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email, 
      password: this.state.password
  }

  this.props.dispatch(login(data))
    .then (res => {
      window.localStorage.setItem("token", res.action.payload.data.token)
      console.log(window.localStorage.getItem('token'))
      this.setState({
        loggedIn:true
      })
    })
    .catch (() => {
      this.setState({
        showModal:true,
        modalTitle:"Failed",
        modalMessage:this.props.users.errMessage
      })
    })
  }

  render () {
    const { email, password } = this.state;
    const isEnabled = email.length > 0 && password.length;
    if(window.localStorage.getItem("token")) return <Redirect to="../"/>
    else return (
      <Grid container component="main" styles={{height: '100%'}}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} style={{backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',}} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div style={{margin:'145px 75px', display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'}}>
        <Avatar style={{margin: '8px', backgroundColor: 'grey'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={{width: '100%', marginTop: '8px'}} noValidate onSubmit={this.handleSubmit}>
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
            autoFocus
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
            Sign In
          </Button>
          <Grid container>
          <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
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
export default connect(mapStateToProps)(formLogin)
