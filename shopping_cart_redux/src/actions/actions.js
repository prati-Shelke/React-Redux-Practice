import axios from "axios"


export const getAllProducts = () =>
{
    return async(dispatch) =>
    {
        const response = await axios.get("http://interviewapi.ngminds.com/api/getAllProducts")
        dispatch
        ({
            type: 'GET_ALL_PRODUCTS',
            payload: response.data.products,
        })
    }
}

export const AddtoCart = (product) =>
{
    
    return {
        type:'ADD_TO_CART',
        payload:product
    }
}

export const RemoveFromCart = (ind) =>
{
    
    return {
        type:'REMOVE_FROM_CART',
        payload:ind
    }
}

export const incrementQty = (ind) =>
{
    return {
        type:'INCREMENT_QTY',
        payload:ind
    }
}

export const decremetQty = (ind) =>
{
    return {
        type:'DECREMENT_QTY',
        payload:ind
    }
}

export const confirmOrder = (order) =>
{
    return async(dispatch) =>
    {
        let response = await axios.post("http://interviewapi.ngminds.com/api/placeOrder",order)
        dispatch
        ({
            type: 'CONFIRM_ORDER',
            payload: response.data.status,
        })
    }
}