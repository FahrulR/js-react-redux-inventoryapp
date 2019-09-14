import React, {Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormAddProduct from '../Form/FormAddProduct'

class ModalAddProduct extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
    }
  }
  
  render(){
    return(
      <Fragment>
        <Button 
          variant={this.props.variant || "light"} 
          onClick={() => {this.setState({showModal:true})}}
          style={{width:'100%'}}>
          Add Products
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={() => {this.setState({showModal:false})}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Products
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormAddProduct closeModal={()=>{this.setState({showModal:false})}} history={this.props.history}/>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

function ModalLayer(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.content}
      </Modal.Body>
    </Modal>
  );
}
export default ModalAddProduct