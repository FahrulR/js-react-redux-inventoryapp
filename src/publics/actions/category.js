import Axios from 'axios'

export const getCategory = () => {
    return {
        type: 'GET_CATEGORY',
        payload: Axios.get('http://localhost:5000/category', {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const addCategory = (data) => {
    return {
        type: 'ADD_CATEGORY',
        payload: Axios.post('http://localhost:5000/category', data, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const deleteCategory = (categoryid) => {
    return {
        type: 'DELETE_CATEGORY',
        payload: Axios.delete(`http://localhost:5000/category/${categoryid}`, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const getCategoryById = (categoryid) => {
    return {
        type: 'GET_CATEGORY_BY_ID',
        payload: Axios.get(`http://localhost:5000/category/${categoryid}`,{
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}

export const editCategory = (categoryid, data) => {
    return {
        type: 'EDIT_CATEGORY',
        payload: Axios.patch(`http://localhost:5000/category/${categoryid}`, data, {
            headers:{
                Authorization: window.localStorage.getItem("token")
            }
        })
    }
}
