import React,{useEffect} from 'react'
import { useDispatch, useSelector,connect } from "react-redux";
import {getAllProducts,AddtoCart} from './actions/actions'
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";

// function({AllProducts,Products}) = for class component
function Home() 
{

    let navigate = useNavigate()
    const AllProducts = useSelector((state)=>state.getAllProduct.AllProducts)
    const dispatch = useDispatch()
    
    useEffect(() => 
    {
        // Products() = for class component
        dispatch(getAllProducts())
    }, [])


    return (
        <div className="container">
            <Navbar  />

            {/* <div className="row">
                <div className="col-sm-12 text-left">
                    <div style={{margin:'25px 0px'}}>
                        <label className="control-label">Sort by:</label>
                        <select value={Sort} onChange={(e)=>sortProduct(e.target.value)}>
                            <option value="Default">Default</option>
                            <option value="High to Low">High to Low</option>
                            <option value="Low to High">Low to High</option>
                        </select>
                    </div>
                </div>
            </div> */}

            <div className="row m-5">
                {AllProducts && AllProducts.map((product,index) => (
                <div className="col-md-3" key={product._id}>
                    <div className={`${index %4===0 && 'bg-info'} ${index%4===1 && 'bg-success'} ${index%4===2 && 'bg-warning'} ${index%4===3 && 'bg-danger'}`}>
                    <div style={{paddingRight:'180px'}}>
                    <img
                        src={`http://interviewapi.ngminds.com/${product.image}`}
                        alt="img not found"
                        width="100"
                        height="200"
                    />
                    </div>
                    <p>{product.name}</p>
                    <p>
                        <i className="fa fa-inr"></i>
                        {product.price}
                    </p>
                    <a className="btn btn-warning" onClick={()=>{dispatch(AddtoCart(product));navigate("/cart")}}>
                        Add to Cart
                    </a>
                    </div>
                    <hr></hr>
                </div>
                ))}
            </div>

            {/* <div className='row'>
                    <div className="col-sm-6 text-left">
                        <div style={{margin:'25px 0px'}}>
                        <Pagination
                        ItemsPerPage={ItemsPerPage}
                        totalItems={AllProducts.length}
                        paginate = {paginate}
                        currentPage = {currentPage}
                        previousPage = {previousPage}
                        nextPage = {nextPage}
                        />
                        </div>
                    </div>
                    <div className="col-sm-6 text-right">
                        <div style={{margin:'25px 0px'}}>
                            <label className="control-label">Items Per Page : </label>
                            <select value={ItemsPerPage} onChange={(e)=>setItemsPerPage(e.target.value)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
            </div> */}
        </div>
    )
}

// const mapStateToProps = state => 
// {
//     return { AllProducts: state.getData.AllProducts }
// }

// const mapDispatchToProps = dispatch =>
// {
//         return {
//           Products: () => {
//             dispatch(getAllProducts())
//           },
//         }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Home)

export default Home