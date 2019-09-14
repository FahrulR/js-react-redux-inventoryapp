import React from 'react'
import {Dropdown} from 'react-bootstrap'

const sort =(props,sort) =>{
  props.history.push("?sortby="+sort)
}

export default function SortByDropdown(props){
  return(
    <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>{sort(props,"name asc")}}>Name Ascending</Dropdown.Item>
          <Dropdown.Item onClick={()=>{sort(props,"name desc")}}>Name Descending</Dropdown.Item>
          <Dropdown.Item onClick={()=>{sort(props,"quantity asc")}}>Stocks Ascending</Dropdown.Item>
          <Dropdown.Item onClick={()=>{sort(props,"quantity desc")}}>Stocks Descending</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  )
}