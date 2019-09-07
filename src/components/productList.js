import React,{Fragment} from 'react'
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

    return(
        <div style={{padding:"3vw", textAlign:"left"}}>
          <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
            {
                this.props.products.productList.length !== 0?
                this.props.products.productList.map((products, index) => {
                  
                  return(  
                    this.props.products.isLoading ? 
                    <Container>
                      <h4><Spinner animation="grow" variant="info"/></h4>
                    </Container>
                    :
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
          <Fragment>
            <Button className="btn btn-warning" 
              disabled={Number(this.state.page) === 1}
              onClick={()=>{this.page(-1)}}
            >
              {'<'}
            </Button>
            <Button variant="warning">{this.state.page}</Button>
            <Button className="btn btn-warning" onClick={()=>{this.page(1)}}>{'>'}</Button>
          </Fragment>
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