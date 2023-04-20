import React,{useState} from 'react'
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector,connect } from "react-redux";
import {confirmOrder} from './actions/actions'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure()

function PlaceOrder() 
{

    let navigate = useNavigate()
    const ProductsOrdered = useSelector((state)=>state.addProductToCart.ProductsOrdered)
    const dispatch = useDispatch()

    const [Name, setName] = useState("");
    const [Addr, setAddr] = useState("");
    let Qty=0,Amt=0
 
    ProductsOrdered.map(product=>
    {
        Qty = Qty + product.qty
        Amt = Amt + parseInt(product.total)
    })
    
    const ConfirmOrder = async() => 
    {
        let Order = {
        personName : Name,
        deliveryAddress : Addr,
        productsOrdered : ProductsOrdered.map(({image,name,...product}) => {
            return product
        })
        }
        if(Name!==""&& Addr!=="")
            dispatch(confirmOrder(Order)).then(()=>navigate('/Home'))
        else
        toast.error('plz fill all the details',{ position: toast.POSITION.TOP_RIGHT, autoClose: 1500 , theme: "colored",hideProgressBar:true})
    }

    return (
                <div className="container">
                    <Navbar />
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <label>Place Order </label>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal" role="form">
                                    <table className="table table-striped">
                                    <thead className="table-head">
                                        <tr>
                                        <td>Product Name</td>
                                        <td> Quntity</td>
                                        <td> SubTotal</td>
                                        </tr>
                                    </thead>
                    
                                    
                                        <tbody >
                                        {ProductsOrdered.map((product) => (
                                        <tr key={product.productID}>
                                            <td> {product.name} </td>
                                            <td>{product.qty}</td>
                                            <td>
                                            <i className="fa fa-inr"></i>
                                            {product.total}
                                            </td>
                                        </tr>
                                        ))}
                                        <tr>
                                            <td>Total</td>
                                            <td>{Qty}</td>
                                            <td>{Amt}</td>
                                        </tr>
                                        </tbody>
                                    
                                    </table>
                                    <br />
                    
                                    <br />
                                    <div className="form-group">
                                    <label  className="col-sm-2 control-label">
                                        Enter Order Details
                                    </label>
                                    </div>
                                    <div className="form-group">
                                    <label  className="col-sm-2 control-label">
                                        Name
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                        className="form-control"
                                        id="inputName3"
                                        placeholder="Name"
                                        value={Name}
                                        onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label  className="col-sm-2 control-label">
                                        Address
                                    </label>
                                    <div className="col-sm-6">
                                        <textarea
                                        className="form-control"
                                        id="inputEmail3"
                                        placeholder="Deliver Address"
                                        value={Addr}
                                        onChange={(e) => setAddr(e.target.value)}
                                        ></textarea>
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label className="col-sm-2 control-label"></label>
                                    <div className="col-sm-6">
                                        <a className="btn btn-warning" onClick={ConfirmOrder}>
                                        Confirm Order
                                        </a>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default PlaceOrder