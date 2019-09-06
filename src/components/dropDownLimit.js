import React from 'react'
import {Dropdown} from 'react-bootstrap'

const limit =(props,limit) =>{
  props.history.push("?limit="+limit)
}

export default function LimitByDropdown(props){
  return(
    <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Limit By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>{limit(props,"3")}}>3</Dropdown.Item>
          <Dropdown.Item onClick={()=>{limit(props,"6")}}>6</Dropdown.Item>
          <Dropdown.Item onClick={()=>{limit(props,"9")}}>9</Dropdown.Item>
          <Dropdown.Item onClick={()=>{limit(props,"12")}}>12</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  )
}