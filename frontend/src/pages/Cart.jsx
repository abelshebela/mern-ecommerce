import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    return (
        <div style={{background: '#eaeded', minHeight: '80vh', padding: '20px 0'}}>
            <div className="amz-cart-page">
                
                <div className="amz-cart-main">
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <div style={{padding: '20px 0'}}>
                            <h2 style={{fontSize: '18px', fontWeight: '500', marginBottom: '15px'}}>Your Shemsu Suk Cart is empty.</h2>
                            <Link to="/" style={{color: '#007185', fontSize: '14px'}}>Shop today's deals</Link>
                        </div>
                    ) : (
                        <div>
                            <div style={{textAlign: 'right', fontSize: '14px', color: '#565959', marginBottom: '5px'}}>Price</div>
                            <div style={{borderBottom: '1px solid #ddd', marginBottom: '20px'}}></div>
                            
                            {cartItems.map((item) => (
                                <div key={item._id} className="amz-cart-item">
                                    <div style={{width: '200px'}}>
                                        <img src={item.image} alt={item.name} className="amz-cart-img" />
                                    </div>
                                    <div className="amz-cart-info">
                                        <div style={{display: 'flex'}}>
                                            <Link to={`/product/${item._id}`} className="amz-cart-title">{item.name}</Link>
                                            <div className="amz-cart-price">
                                                ${item.price.toFixed(2)}
                                            </div>
                                        </div>
                                        
                                        <div className="amz-cart-details">
                                            <span style={{color: '#007600'}}>In Stock</span>
                                            <span>Eligible for FREE Shipping &amp; FREE Returns</span>
                                            <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><input type="checkbox" /> This is a gift <Link to="/" style={{color: '#007185'}}>Learn more</Link></span>
                                        </div>

                                        <div className="amz-cart-actions">
                                            <select 
                                                style={{background: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '5px 10px', boxShadow: '0 2px 5px rgba(15,17,17,.15)', outline: 'none', cursor: 'pointer'}}
                                                value={item.qty} 
                                                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                            >
                                                {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>Qty: {x + 1}</option>
                                                ))}
                                            </select>
                                            
                                            <button onClick={() => removeFromCartHandler(item._id)}>Delete</button>
                                            <button>Save for later</button>
                                            <button>Compare with similar items</button>
                                            <button style={{borderRight: 'none'}}>Share</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{textAlign: 'right', fontSize: '18px'}}>
                                Subtotal ({cartCount} items): <strong style={{fontWeight: '700'}}>${cartTotal}</strong>
                            </div>
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="amz-cart-summary">
                        <div style={{display: 'flex', gap: '10px', marginBottom: '15px', color: '#007600', fontSize: '12px'}}>
                            <span>&#10003;</span>
                            <span>Your order qualifies for FREE Shipping. Choose this option at checkout. <Link to="/" style={{color: '#007185'}}>See details</Link></span>
                        </div>
                        
                        <div className="amz-cart-subtotal">
                            Subtotal ({cartCount} items): <strong>${cartTotal}</strong>
                        </div>
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', marginBottom: '20px'}}>
                            <input type="checkbox" /> This order contains a gift
                        </div>

                        <button 
                            className="btn-amz btn-amz-buy" 
                            style={{width: '100%', borderRadius: '8px', padding: '8px 0'}}
                            onClick={checkoutHandler}
                        >
                            Proceed to checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
