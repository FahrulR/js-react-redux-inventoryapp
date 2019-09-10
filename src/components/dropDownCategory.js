import React from 'react'
import {connect} from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import {getCategory} from '../publics/actions/category'

class DropDownCategory extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      categoryList: [],
      history: props.history 
    }
  }
  goToCategoryPath = () => {
    this.state.history.push(`/category`)
  }

  componentDidMount = async () => {
    if(this.props.category.categoryList.length === 0){
      await this.props.dispatch(getCategory())
      this.setState ({categoryList: this.props.category.categoryList})
    }
  }

  render() {
    const {categoryList} = this.state
    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={()=>{this.goToCategoryPath()}}>List of Category</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const mapStateToProps = state => {
  return{
    category: state.category
  }
}

export default connect(mapStateToProps)(DropDownCategory)
