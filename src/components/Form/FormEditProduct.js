
import React, {Fragment} from 'react'
import {connect} from 'react-redux'

import {Modal, Row, Col, Form, Button} from 'react-bootstrap'
// import {getProductById} from '../publics/actions/products'
import {editProduct} from '../../publics/actions/products'
import {getCategory} from '../../publics/actions/category'

class FormEditProduct extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            categoryList:[],
            productid: props.productId,
            formData:{
                name: props.productData.name,
                description: props.productData.description,
                image: props.productData.image,
                id_category: props.productData.id_category,
                quantity: props.productData.quantity
            },
            showModal:false,
            modalTitle:"",
            modalMessage:""
        }
        this.handleChange = this.handleChange.bind(this);
        console.log('this:', this.state.productid)
    }

    handleClose = () => {
        this.setState({showModal: false})
        if (this.state.redirectOnCloseModal)
        this.props.history.push('/')
    }

    handleChange= (event) => {
        
        console.log('here we go',this.state.productid)
        let newFormData = {...this.state.formData}
        const target = event.target
        const name = target.name
        const value = target.value
        newFormData[name] = value
        this.setState({
            formData: newFormData
        })
        console.log(this.state.formData)
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await this.props.dispatch(editProduct(this.state.productid,this.state.formData))
        .then(res => {
        this.setState({
            showModal:true,
            modalTitle:"Success",
            modalMessage:"Success edit product",
            redirectOnCloseModal: true
        })
    })
    }


    componentDidMount = async () => {
        await this.props.dispatch(getCategory())
        this.setState ({categoryList: this.props.category.categoryList})
    }

    render(){
        const {categoryList} = this.state
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlaintextName">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control value={this.state.formData.name} onChange={this.handleChange} type="text" name="name" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextDescription">
                    <Form.Label column sm="2">
                    Description
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control value={this.state.formData.description} onChange={this.handleChange} type="text" name="description" required/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextImageURL">
                    <Form.Label column sm="2">
                    Image URL
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control value={this.state.formData.image} onChange={this.handleChange} type="text" name="image"  required/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextDateStocks">
                    <Form.Label column sm="2">
                    Stocks
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control value={this.state.formData.quantity} onChange={this.handleChange} name="quantity" type="number" min="0" required/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextCategory">
                    <Form.Label column sm="2">Category</Form.Label>
                    <Col sm="10">
                    <Form.Control onChange={this.handleChange} as="select" name="id_category" required>
                    <option>--Select Category--</option>
                        {categoryList.length !== 0 ? categoryList.map((category) => {
                        const selected = this.state.id_category === category.id
                        
                        return <option selected={selected} value={category.id} key={category.id}> {category.name} </option>
                        })
                        :<option>Loading...</option>
                    }
                    </Form.Control>
                    </Col>
                </Form.Group>

                <Button  style={{float:"right"}} variant="warning" type="submit" className="btn-black">
                    Save
                </Button>
                </Form>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header>
                    <Modal.Title>{this.state.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalMessage}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    products: state.products,
    category: state.category
  }
}

export default connect(mapStateToProps)(FormEditProduct)