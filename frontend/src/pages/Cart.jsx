import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ShoppingCart } from 'lucide-react';
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

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Your cart is currently empty.</p>
                    <Link to="/" className="btn btn-primary">Go Shopping</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {cartItems.map((item) => (
                            <div key={item._id} className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div style={{ flex: 1 }}>
                                    <Link to={`/product/${item._id}`} style={{ fontWeight: '600' }}>{item.name}</Link>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>${item.price}</div>
                                </div>
                                <select 
                                    className="form-input" 
                                    style={{ width: 'auto' }} 
                                    value={item.qty} 
                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                                <button className="btn btn-ghost" style={{ padding: '0.5rem', color: 'var(--danger)' }} onClick={() => removeFromCartHandler(item._id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', height: 'fit-content' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--primary)' }}>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={checkoutHandler}>
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Cart;
