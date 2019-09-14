import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Navbar, Nav, Button, Image, Container, Spinner } from 'react-bootstrap'
import Sidebar from 'react-sidebar'

import Inventory from '../V-Inventory-Logo-negative.png'
import ProductList from '../components/ProductList'
import DropDownCategory from '../components/Dropdown/DropDownCategory'
import SideBarUser from '../components/SideBar'
import { SearchProduct } from '../components/SearchProducts'
import DropDownLimit from '../components/Dropdown/DropDownLimit'
import DropDownSortBy from '../components/Dropdown/DropDownSort'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import DetailProducts from './DetailProducts'
import { getProfile } from '../publics/actions/users'

class Home extends React.Component {
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
            {/* <DropDownLimit history={this.props.history}/> */}
            &nbsp;
            <SearchProduct history={this.props.history}/>
           
          </Nav>
                    <Navbar.Brand href="/">
          <Image src={Inventory} style={{width:'200px', height:'50px'}}/>
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

export default connect(mapStateToProps)(Home)
