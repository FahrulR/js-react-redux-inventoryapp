import React from 'react'
import {Form, InputGroup,FormControl} from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const SearchProduct = (props) => {
  return (
    <Form inline>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onKeyPress={(evt)=>{
            if(evt.key === 'Enter') {
              props.history.push(`/home?search=${evt.target.value}`)
              evt.preventDefault()
            }
          }}
          name="search"
          placeholder="Search Products"
          aria-label="Search products"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </Form>
  )
}