import React,{Fragment} from 'react'
import {Row, Col, Form, Button, Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {addProduct} from '../publics/actions/products'
import {getCategory} from '../publics/actions/category'

class FormAddProduct extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categoryList:[],
            formData:{
                name: '',
                description:'',
                image:'',
                id_category:'',
                quantity:''
            },
            showModal:false,
            modalTitle:"",
            modalMessage:"",
            history:props.history
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClose  = this.handleClose.bind(this)
    }

    handleClose = () => {
        this.setState({showModal: false})
        if (this.state.redirectOnCloseModal)
        this.props.history.push('/')
    }

    handleChange(event){
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
        await this.props.dispatch(addProduct(this.state.formData))
        this.setState({
            showModal: true,
            modalTitle:"Success",
            modalMessage:"Product successfully added!",
            redirectOnCloseModal: true
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
                <Form.Control onChange={this.handleChange} type="text" name="name" placeholder="Name..." />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextDescription">
                <Form.Label column sm="2">
                    Description
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} type="text" name="description" placeholder="Description..." />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextImageURL">
                <Form.Label column sm="2">
                    Image URL
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} type="text" name="image" placeholder="Image URL..." />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextDateReleased">
                <Form.Label column sm="2">
                    Stocks
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} name="quantity" type="number" min="0" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextCategory">
                <Form.Label column sm="2">Category</Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} as="select" name="id_category">
                    <option>--Select Category--</option>
                    {categoryList.length !== 0 ? categoryList.map((category) => {
                    return <option value={category.id} key={category.id}> {category.name} </option>
                    })
                    :<option>Loading...</option>
                }
                </Form.Control>
                </Col>
            </Form.Group>

            <Button style={{float:"right"}} variant="warning" type="submit">
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

const mapStateToProps = state => {
  return{
    products: state.products,
    category: state.category
  }
}

export default connect(mapStateToProps)(FormAddProduct)
