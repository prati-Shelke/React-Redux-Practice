import storage from 'redux-persist/lib/storage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure()




const initialState = {
    AllProducts : [],
    ProductsOrdered : [],
    
}


export const getAllProduct = (state = initialState  , action) =>
{
    switch(action.type)
    {
        case 'GET_ALL_PRODUCTS':return {
                                            ...state,
                                          AllProducts:action.payload
                                        }
                                
            
        default : return state
    }
}

export const addProductToCart = (state = initialState,action) =>
{ 
    
    switch(action.type)
    {
        case 'ADD_TO_CART':  
                            if(state.ProductsOrdered.length ===0)
                            {
                                
                                return {
                                            ...state,
                                            ProductsOrdered :[{
                                                            productID:action.payload._id,
                                                            qty:1,
                                                            price: action.payload.price,
                                                            total: action.payload.price,
                                                            name : action.payload.name,
                                                            image : action.payload.image
                                            }]
                                        }
                            }
                            else
                            {
                                let temp = 'not same'
                                state.ProductsOrdered.map(localproductsOrder =>
                                {
                                    if(localproductsOrder.productID === action.payload._id)
                                    {
                                        temp = 'same'
                                        localproductsOrder.qty = localproductsOrder.qty + 1
                                        localproductsOrder.total = localproductsOrder.total * localproductsOrder.qty
                                    }
                                    return {...state}
                                
                                })
                                if(temp === 'not same')
                                {
                                    return {
                                        ...state,
                                        ProductsOrdered :[...state.ProductsOrdered ,
                                            {
                                                        productID:action.payload._id,
                                                        qty:1,
                                                        price: action.payload.price,
                                                        total: action.payload.price,
                                                        name : action.payload.name,
                                                        image : action.payload.image
                                            }]
                                    }
                                }
                            }
        
        case 'REMOVE_FROM_CART':   let temp = state.ProductsOrdered.filter((p,i)=> i!== action.payload)
                                    return {
                                            ...state,
                                            ProductsOrdered:state.ProductsOrdered.filter((p,i)=> i!== action.payload)
                                           }             

        case 'INCREMENT_QTY': return {...state,
                                        ProductsOrdered:state.ProductsOrdered.map((product,i)=>
                                        {   
                                            if(i === action.payload)
                                            {
                                                return {
                                                        ...product,
                                                        qty:product.qty+1,
                                                        total:parseInt(product.total)+parseInt(product.price)
                                                }
                                            }
                                            return product
                                        })}

        case 'DECREMENT_QTY': return {...state,
                                            ProductsOrdered:state.ProductsOrdered.map((product,i)=>
                                            {   
                                                if(i === action.payload)
                                                {
                                                    return {
                                                            ...product,
                                                            qty:product.qty-1,
                                                            total:parseInt(product.total)-parseInt(product.price)
                                                    }
                                                }
                                                return product
                                        })}

        case 'CONFIRM_ORDER':   
                                storage.removeItem('persist:main')
                                toast.success("You have successfully place the order", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 1000,
                                    theme: "colored",
                                    hideProgressBar: true,
                                });
                                return {...state,ProductsOrdered:[]}
                              
        default : return state
    }
}

