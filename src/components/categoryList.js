import React from 'react';
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import {Alert, Modal, Button, Badge} from 'react-bootstrap'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getCategory} from '../publics/actions/category'
import {deleteCategory} from '../publics/actions/category'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ModalEditCategory from '../components/Modal/ModalEditCategory'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



class CategoryList extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      categoryList: [],
      showModal: false,
      modalTitle:'',
      modalMessage:''
      
    }
    console.log(this.state.categoryData)
    // this.handleDelete = this.handleDelete.bind(this)
  }
  

  componentDidMount = async () => {
    await this.props.dispatch(getCategory())
    this.setState ({categoryList: this.props.category.categoryList})
}

  handleDelete = (event, id) => {
    event.preventDefault()
     confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.dispatch(deleteCategory(id))
      .then(() => {
      this.setState({
        showModal: true,
        modalTitle: "Success",
        modalMessage: 'Succes deleting Category',
        redirectOnCloseModal: true
      })
    })
    .catch(() => {
      this.setState({
        showModal: true,
        modalTitle: 'Failed',
        modalMessage: this.props.category.errMessage
      })
    })
        },
        {
          label: 'No',
          onClick: () => this.props.history.push(`/category/`)
        }
      ]
    });

}

  
  handleClose = () => {
      this.setState({showModal: false})
      if (this.state.redirectOnCloseModal)
        this.props.history.push('/')
    }
  

  render(){
  console.log( this.props.category)
  const {categoryList} = this.state
  return (
    <div>
    
    <Paper style={{width: "100%", marginTop: "124px", overflowX: "auto"}}>
      <Table style={{minWidth: "650"}}>
        <TableHead>
          <TableRow>
          <TableCell><h3><b>Categories</b></h3></TableCell>
            <TableCell><h3><b>Action</b></h3></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
              {categoryList.length !== 0 ? categoryList.map((category) => {
              return <TableRow key ={category.name}>
                 <TableCell component="th" scope="row" key={category.id}> {category.name} </TableCell>
                 <TableCell component="th" scope="row" >
                   
                 <ModalEditCategory history={this.props.history} categoryId = {category.id} categoryData={category} />
                 <IconButton aria-label="Delete" onClick={(event) => this.handleDelete(event, category.id)}>
                                           <DeleteIcon /> 
                                        </IconButton>
                 </TableCell>
                 </TableRow>
              })
              :<p><center>Loading...</center></p>
              } 
        </TableBody>
      </Table>
    </Paper>
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
  );
}
}

const mapStateToProps = state => {
  console.log('here')
  return{
    category: state.category
  }
}

export default connect(mapStateToProps)(CategoryList)