import React, {Fragment} from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormEditCategory from '../Form/FormEditCategory';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

class ModalEditCategory extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
    }
  }
  render(){
    return(
      <Fragment>
        <IconButton aria-label="Edit"
        onClick={() => {this.setState({showModal:true})}}>
        <EditIcon />
       </IconButton>
        <Modal
          show={this.state.showModal}
          onHide={() => {this.setState({showModal:false})}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormEditCategory 
              closeModal={()=>{this.setState({showModal:false})}} 
              history={this.props.history}
              categoryId={this.props.categoryId}
              categoryData= {this.props.categoryData}
              />
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

export default ModalEditCategory