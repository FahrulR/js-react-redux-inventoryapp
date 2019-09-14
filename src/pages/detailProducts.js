import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Loader from '../components/Loader';
import {deleteProduct, getProductById, addProductQTY, reduceProductQTY} from '../publics/actions/products'
import {getProfile} from '../publics/actions/users'
import store from '../publics/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Alert, Modal, Button, Badge} from 'react-bootstrap'
import ModalEditProduct from '../components/Modal/ModalEditProduct'
import {Link} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class DetailProducts extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      productUrl: props.productUrl,
      productData: props.products.productList.find((products) => {return products.id === Number(props.productid)}),
      userData:{},
      showModal: false,
      modalTitle:'',
      modalMessage:'',
      unsubscribe: store.subscribe(this.listener)
    }
    console.log('here list',this.state.productData)
  }

  listener = () => {
    const current = store.getState().products.productsList.find ((products) => {
      return products.id === Number(this.props.productid)
    })
    console.log(current, this.state.productData)
    if(current !== this.state.productData){
      this.setState({productData: current})
    }
  }

   getProductData = async () => {
    this.props.dispatch(getProductById(this.props.productid))
      .then(()=>{
        const productData = this.props.products.productList.find((products)=>{return Number(products.id) === Number(this.props.productid)})
        if(productData !== undefined){
          this.setState({productData}
          )
        }else{
          this.props.history.push('/')
        }
      })
      .catch(err => {
        console.error(err)
        this.props.history.push('/')
      })
  }
  
  addProductQuantity = e => {
    const token = window.localStorage.getItem("token")
    const {id} = this.props.match.params
    e.preventDefault()
    this.props.dispatch(addProductQTY(id))
        .then(res => {
        this.setState({
            showModal: true,
            modalTitle:"Success",
            modalMessage:"Quantity successfully added!",
            redirectOnCloseModal: true
        })
    }).catch(()=>{
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage: "Something Wrong"
        })
      })
    
  }

  reduceProductQuantity = e => {
    const token = window.localStorage.getItem("token")
    const {id} = this.props.match.params
    e.preventDefault()
     this.props.dispatch(reduceProductQTY(id))
        .then(res => {
        this.setState({
            showModal: true,
            modalTitle:"Success",
            modalMessage:"Quantity successfully reduced!",
            redirectOnCloseModal: true
        })
    }).catch(()=>{
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage: "Something Wrong"
        })
      })
  }


  componentDidMount = async () => {
    if(!window.localStorage.getItem("token"))
      this.props.history.push('/')

    if(!this.state.productData){
      this.getProductData()
    }
    await this.props.dispatch(getProfile())
      this.setState({
        userData: this.props.users.usersProfile
      })
  }

  componentWillMount = () => {
    this.state.unsubscribe()
  }

  handleDelete = (event) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.dispatch(deleteProduct(this.state.productData.id))
      .then(() => {
        this.setState({
          showModal: true,
          modalTitle: "Success",
          modalMessage: 'Succes deleting Product',
          redirectOnCloseModal: true
        })
      })
      .catch(() => {
        this.setState({
          showModal: true,
          modalTitle: 'Failed',
          modalMessage: this.props.products.errMessage
        })
      })
        },
        {
          label: 'No',
          onClick: () => this.props.history.push(`/products/`+this.state.productData.id)
        }
      ]
    });
  }


  handleClose = () => {
    this.setState({showModal: false})
    if (this.state.redirectOnCloseModal)
      this.props.history.push('/')
  }

  render () {
    const {productData} = this.state
    // console.log("PLEASE",this.state.productData.id)    

    if(productData === undefined){
      console.log(this.state)
      return (
        <Loader style={{marginTop: "100px"}}/>
      )
    } else if (productData === null){
      console.log(this.state)
      return (
        <Alert variant="danger">Product Not Found</Alert>
      )
    } else {
      // let stringDateReleased = new Date (productData.released).toDateString()
      return (
        <div>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12 p-0'>
                <div className='bg-header' style={{ backgroundImage: `url('http://www.impresserp.com/wp-content/uploads/2017/02/Inventory-background.png`, width: "100%", height: "auto" }}>
                  <div className='col-8 col-sm-6 p-3'>
                    <Link to="../../home" className='btn btn-warning' style={{position:'fixed'}}>
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                  </div>
                  {/* {this.state.userData.level === 'admin' ?  */}
                    <div className='d-flex align-items-end flex-column bd-highlight mb-3' style={{ height: '200px' }}>
                      <div className='p-2 bd-highlight' style={{ marginTop: '-25px' }}>
                        <ModalEditProduct history={this.props.history} productId={productData.id} productData={productData}/><a>&nbsp;</a>
                        <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div class='d-flex bd-highlight'>
              <div class='p-2 w-100 bd-highlight'>
                <div class='row'>
                  <div className='col-sm-8 mb-12 p-2'>
                    {/* <Badge pill variant="warning">
                      <h6>{this.props.genres.genreList.find(genre => genre.genreid === productData.genreid).name}</h6>
                    </Badge> */}
                  </div>
                </div>
                <div className='d-flex align-items-start flex-column bd-highlight mb-3'>
                  <div class='p-0 bd-highlight'>
                    <font>
                      <h2>{productData.name}</h2>
                    </font>
                  </div>
                  {/* <div class='p-0 mb-3 bd-highlight'>
                    <font>  
                      <h3>
                        <b>{productData.date_added}</b>
                      </h3>
                    </font>
                  </div> */}
                  <div class='p-0 bd-highlight'>Description: {productData.description}</div>
                  <div class='p-0 bd-highlight'>Category: {productData.category}</div>
                  <div class='p-0 bd-highlight'>Stocks: {productData.quantity}</div> 
                  <Button variant="outline-primary" onClick={this.addProductQuantity}>&nbsp;Add&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                  <br />
                  <Button variant="outline-secondary " onClick={this.reduceProductQuantity}>&nbsp;Reduce&nbsp;</Button> 
                </div>
              </div>
              <div class='row align-items-start' style={{ marginLeft: '20vh' }}>
                <div class='row justify-content-start'>
                  <div class='col-6 col-md-4'>
                    <div className='small' style={{ backgroundImage: `url('${productData.image}'), url('http://modulos.ai/wp-content/themes/cannyon_/media/_frontend/img/grid-no-image.png')`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}></div>
                  </div>
                </div>
                <div class='row justify-content-end'>
                  <div class='col-4 col-md-8'>
                  </div>
                </div>
              </div>
              <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header>
                  <Modal.Title>{this.state.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {this.state.modalMessage}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
            </Modal>
            </div>
          </div>
        </div>
      )}
  }
}

const mapStateToProps = (state) => {
  return{
    products: state.products,
    users: state.users,
    category: state.category
  }
}

export default connect(mapStateToProps)(DetailProducts)
