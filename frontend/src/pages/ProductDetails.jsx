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
        <div className="container product-details-container">
            <Link to="/" className="btn btn-ghost back-btn">
                <ArrowLeft size={18} /> Go Back
            </Link>
            <div className="product-details-grid">
                <div className="product-image-section">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info-section">
                   <h2 className="product-title">{product.name}</h2>
                   <div className="product-rating">
                       <Star size={20} fill="#fbbf24" stroke="none" />
                       <span className="rating-score">{product.rating}</span>
                       <span className="review-count">({product.numReviews} reviews)</span>
                   </div>
                   <h3 className="product-price">${product.price}</h3>
                   <p className="product-description">{product.description}</p>
                   
                   <div className="glass purchase-card">
                       <div className="purchase-row">
                           <span>Status:</span>
                           <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                       </div>

                       {product.countInStock > 0 && (
                           <div className="purchase-row">
                               <span>Qty:</span>
                               <select 
                                   className="form-input qty-select" 
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
                         className="btn btn-primary add-btn hide-on-mobile" 
                         disabled={product.countInStock === 0}
                         onClick={addToCartHandler}
                       >
                           <ShoppingCart size={18} /> Add To Cart
                       </button>
                   </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            {product.countInStock > 0 && (
              <div className="mobile-cta">
                <button 
                  className="btn btn-primary sticky-add-btn" 
                  onClick={addToCartHandler}
                >
                  <ShoppingCart size={18} /> Add To Cart - ${product.price}
                </button>
              </div>
            )}
        </div>
    );
};
export default ProductDetails;
