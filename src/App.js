import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css'

import Auth from './pages/auth'
import Home from './pages/home'
import Category from './pages/category'
import DetailProducts from './pages/detailProducts'

const App = () => {
    return (
      <div>
        <Router>
            <Route
              exact
              path={'/'}
              render={() => {
                return window.localStorage.getItem('token') !== null
                  ? <Redirect to='./home' />
                  : <Redirect to='./login' />
              }}
            />
            
            <Route
              path={'/home'}
              render={(props) => {
                return <Home {...props}/>
              }}
            />
             <Route
              path={'/category'}
              render={(props) => {
                return <Category {...props}/>
              }}
            />
            <Route
              path={'/products/:id'}
              component={(props) => {
                return <DetailProducts 
                {...props} productId={props.match.params.productid} 
                productUrl={`http://localhost:5000/products/${props.match.params.id}`}
                productid = {props.match.params.id}
                key={props.history.location}/>
              }} 
            />

              
            
            <Route
              path={'/login'}
              render={(props) => {
                return <Auth {...props}/>
              }}
            />
            <Route
              path={'/register'}
              render={(props) => {
                return <Auth {...props}/>
              }}
            />
        </Router>
      </div>
    )
}

export default App
