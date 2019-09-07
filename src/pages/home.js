import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Navbar, Nav, Button, Image, Container, Spinner } from 'react-bootstrap'
import Sidebar from 'react-sidebar'

import Inventory from '../the-inventory-vector-logo.svg'
import ProductList from '../components/productList'
import DropDownCategory from '../components/dropDownCategory'
import SideBarUser from '../components/sideBar'
import { SearchProduct } from '../components/searchProducts'
import DropDownLimit from '../components/dropDownLimit'
import DropDownSortBy from '../components/dropDownSort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import DetailProducts from './detailProducts'
import { getProfile } from '../publics/actions/users'

class home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      search:"",
      userData:undefined
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen (open) {
    this.setState({ sidebarOpen: open })
  }

  componentDidMount = async () => {
    if(window.localStorage.getItem("token") === null)
      this.props.history.push('/')
      await this.props.dispatch(getProfile())
      this.setState({
        userData: this.props.users.usersProfile
      })
  }

  render () {
    console.log(this.props)
    return ( 
      <div>
        <Sidebar
          sidebar={<SideBarUser
            history={this.props.history}
          />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: 'white', zIndex: '20', width: '20%', position: 'fixed' } }} />
        <Navbar bg='light' variant='light' className='shadow' fixed='top'>
          <Nav className='mr-auto'>
            <Button variant='light' onClick={() => this.onSetSidebarOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
            <DropDownCategory history={this.props.history}/>
            <DropDownSortBy history={this.props.history}/>
            <DropDownLimit history={this.props.history}/>
            &nbsp;
            <SearchProduct history={this.props.history}/>
           
          </Nav>
          <Navbar.Brand href="/">
          <Image src={Inventory} style={{width:'50px', height:'50px'}}/>
            <b>Inventory</b>
          </Navbar.Brand>
        </Navbar>
        <Route 
          path="/home" 
          exact={true}
          render={() => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div className="container md-5">
                
                <ProductList
                  sortby={params.get("sortby")} 
                  search={params.get("search")}
                  limit={params.get("limit")}
                  dataSource={`http://localhost:5000/products`} 
                  key={window.location.href + this.state} />
              </div>
            );
          }} 
        />
         <Route
              path={'/products/:id'}
              exact={true}
              component={(props) => {
                return <DetailProducts 
                {...props} productId={props.match.params.productid} 
                productUrl={`products/${props.match.params.id}`}
                productid = {props.match.params.id}
                key={props.history.location}/>
              }} 
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.users,
  }
}

export default connect(mapStateToProps)(home)
