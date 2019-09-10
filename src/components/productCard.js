import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import {connect} from 'react-redux'

class ProductCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      productid: props.productid,
      name: props.name,
      description : props.description,
      image : props.image,
      id_category : props.id_category,
      quantity : props.quantity,
      date_added : props.date_added,
      date_updated : props.date_updated,
      redirectToDetails:false
    }
    this.redirectToDetails = this.redirectToDetails.bind(this)
  }

  redirectToDetails = () => {
    this.setState({redirectToDetails:true})
  }

  render () {
    if (this.state.redirectToDetails)
      return <Redirect to={`/products/${this.state.productid}`}/>
    const {description} = this.state
    return (
      <Card style={{cursor:'pointer' }} className='card shadow-lg'
        onClick={() => this.redirectToDetails()}
        >
          <Card.Img variant="top" style={{width:"100%"}} className="book-image" src={this.state.image} onError={(e)=>{e.target.onerror = null; e.target.src="http://modulos.ai/wp-content/themes/cannyon_/media/_frontend/img/grid-no-image.png"}}/>
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
          <Card.Text>
          Stock: {this.state.quantity}
          </Card.Text>
          <Card.Text>
            {description.length > 30 ?  description.substr(0,30)+'...': description}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.users
  }
}
export default connect(mapStateToProps)(ProductCard)
