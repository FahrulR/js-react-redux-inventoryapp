import React,{Fragment} from 'react'
import {Row, Col, Form, Button, Modal} from 'react-bootstrap'
import {connect} from 'react-redux'

import {addCategory} from '../../publics/actions/category'

class FormAddCategory extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formData:{
                name: '',
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
        await this.props.dispatch(addCategory(this.state.formData))
        this.setState({
            showModal: true,
            modalTitle:"Success",
            modalMessage:"Category successfully added!",
            redirectOnCloseModal: true
        })
    }

  render(){
    return (
        <Fragment>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label column sm="2">
                    Name
                </Form.Label>
                <Col sm="10">
                <Form.Control onChange={this.handleChange} type="text" name="name" placeholder="Name..." required/>
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
    category: state.category
  }
}

export default connect(mapStateToProps)(FormAddCategory)
