import React from 'react'
import {connect} from 'react-redux'
import { Alert, Button, Spinner, Container } from 'react-bootstrap'

import ProductCard from './productCard'
import {getProducts} from '../publics/actions/products'

class ProductList extends React.Component{
  constructor(props){
    super(props)


    this.state = {
      dataSource: props.dataSource || "http://localhost:5000/products",
      history: props.history,
      data: []
    }
  }

  componentDidMount(){
    this.getDataProducts(1)
  }

  page = (page) => {
    this.getDataProducts(Number(this.state.page) + page)
  }

  getDataProducts = async (page) => {
    await this.props.dispatch(getProducts(this.state.dataSource, page, this.props.sortby, this.props.search, this.props.limit))
    this.setState({
      data: this.props.products,
      page: page
    })
  }
  
 render(){

    const {data} = this.state
    return(
        <div style={{padding:"3vw", textAlign:"left"}}>
          <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
            {
               data !== null && data.productList ?
               data.productList.isLoading ? 
               <Container>
                 <h4><Spinner animation="border"/>Loading</h4>
               </Container>
                :
                data.productList.map((products, index) => {
                  return( 
                      <div style={{marginTop:"40px"}}>
                      <ProductCard  
                        onClick={() => this.getDetails(index)}
                        productid={products.id}
                        name={products.name}
                        description={products.description.substr(0,30)+'...'}
                        image={products.image} 
                        id_category={products.id_category}
                        quantity={products.quantity}
                        date_added={products.date_added}
                        date_update={products.date_updated}
                        />
                        </div>
                    )
                  })
               
                :
                <Alert variant=''></Alert>
            }
          </div>
        </div>
    )
  }
 }

const mapStateToProps = state => {
  console.log('here')
  return{
    products: state.products
  }
}

export default connect(mapStateToProps)(ProductList)