import Axios from 'axios'

const token = window.localStorage.getItem("token")

export const getProducts = (dataSource =null, page =1, sortby=null, search=null, limit=null) => {
    const limits = limit || 3
    let url = `${dataSource}?page=${page}`
    if(sortby !== null)
        url += `&sortby=${sortby}`
    if(search !== null)
        url += `&search=${search}`
    if(limit !== null)
        url += `&limit=${limits}`

    return {
        type: 'GET_PRODUCTS',
        payload: Axios.get(url, {
            headers:{
                Authorization: token
            }
        })
    }
}

export const getProductById = (productid) => {
    return {
        type: 'GET_PRODUCT_BY_ID',
        payload: Axios.get(`http://localhost:5000/products/${productid}`,{
            headers:{
                Authorization: token
            }
        })
    }
}


export const addProductQTY = (productid) => {
    return {
        type: 'ADD_PRODUCT_QTY',
        payload: Axios.patch(`http://localhost:5000/products/${productid}/add=1`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const reduceProductQTY = (productid) => {
    return {
        type: 'REDUCE_PRODUCT_QTY',
        payload: Axios.patch(`http://localhost:5000/products/${productid}/reduce=1`,{
            headers:{
                Authorization: token
            }
        })
    }
}


export const addProduct = (data) => {
    return {
        type: 'ADD_PRODUCT',
        payload: Axios.post('http://localhost:5000/products', data, {
            headers:{
                Authorization: token
            }
        })
    }
}

export const deleteProduct = (productid) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: Axios.delete(`http://localhost:5000/products/${productid}`,{
            headers:{
                Authorization: token
            }
        })
    }
}

export const editProduct = (productid, data) => {
    return{
        type: 'EDIT_PRODUCT',
        payload: Axios.patch(`http://localhost:5000/products/${productid}`, data, {
            headers:{
                Authorization: token
            }
        })
    }
}

