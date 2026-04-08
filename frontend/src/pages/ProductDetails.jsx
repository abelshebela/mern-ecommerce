import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';

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

    if (isLoading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">{error?.data?.message || error.error}</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <Link to="/" className="btn btn-ghost" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
                <ArrowLeft size={18} /> Go Back
            </Link>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px' }} />
                <div>
                   <h2 style={{ fontSize: '2rem' }}>{product.name}</h2>
                   <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
                       <Star size={20} fill="#fbbf24" stroke="none" />
                       <span style={{color: '#fbbf24'}}>{product.rating}</span>
                       <span style={{ color: 'var(--text-muted)' }}>({product.numReviews} reviews)</span>
                   </div>
                   <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>${product.price}</h3>
                   <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>{product.description}</p>
                   
                   <div className="glass" style={{ padding: '1.5rem' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                           <span>Status:</span>
                           <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                       </div>

                       {product.countInStock > 0 && (
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                               <span>Qty:</span>
                               <select 
                                   className="form-input" 
                                   style={{ width: 'auto' }} 
                                   value={qty} 
                                   onChange={(e) => setQty(Number(e.target.value))}
                               >
                                   {[...Array(product.countInStock).keys()].map((x) => (
                                       <option key={x + 1} value={x + 1}>{x + 1}</option>
                                   ))}
                               </select>
                           </div>
                       )}

                       <button 
                         className="btn btn-primary" 
                         style={{ width: '100%' }} 
                         disabled={product.countInStock === 0}
                         onClick={addToCartHandler}
                       >
                           <ShoppingCart size={18} /> Add To Cart
                       </button>
                   </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
