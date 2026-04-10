import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { Star, MapPin, Lock } from 'lucide-react';

const ProductDetails = () => {
    const { id: productId } = useParams();
    const [qty, setQty] = useState(1);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    if (isLoading) return (
        <div className="container" style={{background: 'white', padding: '20px', minHeight: '80vh', marginTop: '20px'}}>
            <div className="pd-amz-layout">
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <div className="skeleton" style={{width: '60px', height: '60px', borderRadius: '4px'}}></div>
                    <div className="skeleton" style={{width: '60px', height: '60px', borderRadius: '4px'}}></div>
                </div>
                <div className="skeleton" style={{width: '100%', height: '500px'}}></div>
                <div className="pd-center-col">
                   <div className="skeleton skeleton-text" style={{height: '32px', marginBottom: '20px'}}></div>
                   <div className="skeleton skeleton-text short"></div>
                   <br/><br/>
                   <div className="skeleton skeleton-text"></div>
                   <div className="skeleton skeleton-text"></div>
                   <div className="skeleton skeleton-text"></div>
                </div>
                <div className="skeleton-card" style={{height: '400px'}}>
                   <div className="skeleton skeleton-text" style={{height: '30px', width: '50%', marginBottom:'20px'}}></div>
                   <div className="skeleton skeleton-text"></div>
                   <div className="skeleton skeleton-text"></div>
                   <div className="skeleton" style={{height: '40px', borderRadius:'20px', marginTop:'20px'}}></div>
                   <div className="skeleton" style={{height: '40px', borderRadius:'20px', marginTop:'10px'}}></div>
                </div>
            </div>
        </div>
    );
    if (error) return <div className="container" style={{padding: '40px'}}>{error?.data?.message || error.error}</div>;

    const priceParts = product.price.toFixed(2).split('.');

    return (
        <div className="container" style={{background: 'white', padding: '20px', minHeight: '80vh'}}>
            <div style={{fontSize: '12px', color: '#565959', marginBottom: '20px'}}>
               <Link to="/" style={{color: '#565959', textDecoration: 'none'}}>Home</Link> &rsaquo; {product.category} &rsaquo; {product.brand}
            </div>

            <div className="pd-amz-layout">
                {/* Thumbnails (mock column) */}
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <div style={{border: '1px solid #007185', borderRadius: '4px', padding: '5px', cursor: 'pointer', height:'60px'}}>
                        <img src={product.image} alt={product.name} style={{width:'100%', height:'100%', objectFit:'contain'}}/>
                    </div>
                </div>

                {/* Main Image */}
                <div className="pd-main-img">
                    <img src={product.image} alt={product.name} />
                </div>

                {/* Center Details */}
                <div className="pd-center-col">
                   <h1 className="pd-title">{product.name}</h1>
                   <Link to="/" className="pd-brand-link">Visit the {product.brand} Store</Link>
                   
                   <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                       <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                           {[...Array(5)].map((_, i) => (
                             <Star 
                               key={i} 
                               size={18} 
                               fill={i < Math.floor(product.rating) ? "#ffa41c" : "transparent"} 
                               stroke={i < Math.floor(product.rating) ? "#ffa41c" : "#a7acb2"} 
                             />
                           ))}
                           <span style={{color: '#007185', marginLeft:'5px'}}>{product.numReviews} ratings</span>
                       </div>
                   </div>

                   <div className="pd-divider"></div>

                   <div className="pd-price-row">
                      <div className="amz-price-box">
                        <span className="amz-price-symbol" style={{fontSize:'14px', top:'4px'}}>$</span>
                        <span className="amz-price-whole" style={{fontSize:'32px'}}>{priceParts[0]}</span>
                        <span className="amz-price-fraction" style={{fontSize:'14px', top:'4px'}}>{priceParts[1]}</span>
                      </div>
                   </div>

                   <div style={{fontSize:'14px', color:'#565959', marginBottom:'15px'}}>
                       Available at a lower price from other sellers that may not offer free Prime shipping.
                   </div>

                   <ul className="pd-bullets">
                       <li>{product.description.split('.')[0]}.</li>
                       <li>High performance specifications tested for durability.</li>
                       <li>Backed by the {product.brand} official guarantee.</li>
                       <li>Includes all standard accessories in the box.</li>
                   </ul>
                </div>

                {/* Buy Box */}
                <div className="amz-buy-box">
                    <div className="amz-buy-box-price">${product.price.toFixed(2)}</div>
                    
                    <div className="prime-badge" style={{marginBottom: '5px'}}>
                       <span>&#10003;</span><span>prime</span>
                    </div>

                    <div className="delivery-date">
                       FREE Returns<br/>
                       FREE delivery <strong>Tomorrow, July 10.</strong> Order within 5 hrs 30 mins
                    </div>

                    <div style={{display: 'flex', gap:'5px', color:'#007185', fontSize:'12px', alignItems:'center', marginBottom:'15px', cursor:'pointer'}}>
                       <MapPin size={14}/> Deliver to United States
                    </div>

                    {product.countInStock > 0 ? (
                        <div className="in-stock-green">In Stock</div>
                    ) : (
                        <div className="out-of-stock-red">Currently unavailable.</div>
                    )}

                    {product.countInStock > 0 && (
                        <select 
                           className="amz-qty-select" 
                           value={qty} 
                           onChange={(e) => setQty(Number(e.target.value))}
                        >
                           {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                               <option key={x + 1} value={x + 1}>Quantity: {x + 1}</option>
                           ))}
                        </select>
                    )}

                    <div className="action-stack">
                        <button 
                          className="btn-amz" 
                          style={{width:'100%', borderRadius:'20px', padding:'10px', background:'#ffd814', borderColor:'#fcd200'}}
                          disabled={product.countInStock === 0}
                          onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                        <button 
                          className="btn-amz btn-amz-buy" 
                          style={{width:'100%', borderRadius:'20px', padding:'10px'}}
                          disabled={product.countInStock === 0}
                        >
                            Buy Now
                        </button>
                    </div>

                    <div style={{display: 'flex', gap:'8px', alignItems:'center', color:'#565959', fontSize:'13px', marginTop:'10px'}}>
                        <Lock size={14}/> <span style={{color:'#007185', cursor:'pointer'}}>Secure transaction</span>
                    </div>

                    <div className="ships-from" style={{marginTop:'10px'}}>
                        <span>Ships from</span>
                        <span>Shemsu Suk</span>
                        <span>Sold by</span>
                        <span>{product.brand} Store</span>
                        <span>Returns</span>
                        <span style={{color:'#007185', cursor:'pointer'}}>Eligible for Return</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
