import React from 'react'
import { useDispatch, useSelector,connect } from "react-redux";
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import {RemoveFromCart,incrementQty,decremetQty} from './actions/actions'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure()


function Cart() 
{
    let navigate = useNavigate()
    const ProductsOrdered = useSelector((state)=>state.addProductToCart.ProductsOrdered)
    const dispatch = useDispatch()

    console.log(ProductsOrdered);
    let totalAmountPayable = 0

        ProductsOrdered.map(product=>
        {
            totalAmountPayable += parseInt(product.total)
        })  
    
    const placeOrder = () =>
    {
        if(totalAmountPayable<500)
        {
            toast.error('Plz add more Items to place order',{ position: toast.POSITION.TOP_RIGHT, autoClose: 1500 , theme: "colored",hideProgressBar:true})
        }
        else
        {
            navigate('/place-order')
        }
    }
    
    
    return (
                <div className='container'>
                    <Navbar />
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">MY CART ({ProductsOrdered.length})</div>
                            {ProductsOrdered.length!==0 ? ProductsOrdered.map((product,ind) =>
                            <div className="panel-body" key={product.productID}>
                            
                            <form>
                                <div className="row">
                                <div className="col-md-3">
                                    <img alt='not defined'
                                    src={`http://interviewapi.ngminds.com/${product.image}`}
                                    width="100px"
                                    height="200px"
                                    />
                                </div>

                                <div className="col-md-3">
                                    {product.name}
                                    <br />
                                    <i className="fa fa-inr"></i>{product.price}
                                </div>

                                <div className="col-md-3">
                                    quantity
                                    <br />
                                    <button className="qtyminus" onClick={(e)=>{e.preventDefault();dispatch(decremetQty(ind))}} style={product.qty===1 ? {cursor:'not-allowed'} : {cursor:'pointer'}} disabled = {product.qty===1 && true}>
                                        -
                                    </button>

                                    <input type="text" name="quantity" style={{width:'150px'}} className="qty" size="5px" value={product.qty} onChange={()=>''}/>
                                    <button ng-click="increment()" onClick={(e)=>{e.preventDefault();dispatch(incrementQty(ind))}}>+</button>
                                </div>
                                
                                <div className="col-md-3">
                                    <a className="btn btn-warning" onClick={()=>dispatch(RemoveFromCart(ind))}>
                                    remove
                                    </a>
                                </div>
                                </div>
                            </form>
                            <hr />
                            
                            </div>
                            ): <label style={{color:'red',fontSize:'16px',margin:'50px'}}> Your Cart is empty</label>}
                            
                            <div className="row">
                                <div className="col-md-9">
                                <label className="pull-right">Amount Payable</label>
                                </div>
                                <div className="col-md-3 ">{totalAmountPayable}</div>
                            </div>
                            <div className="panel-footer">
                            <button className="btn btn-success" style={{}} onClick={()=>navigate('/Home')}>Continue Shopping</button>
                            <button className="pull-right btn btn-danger" onClick={placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Cart