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
        <div className="container cart-container">
            <h1 className="cart-title">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="glass empty-cart">
                    <p>Your cart is currently empty.</p>
                    <Link to="/" className="btn btn-primary">Go Shopping</Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item._id} className="glass cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <Link to={`/product/${item._id}`} className="item-name">{item.name}</Link>
                                    <div className="item-price">${item.price}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <select 
                                        className="form-input qty-select" 
                                        value={item.qty} 
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-ghost remove-btn" onClick={() => removeFromCartHandler(item._id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="glass cart-summary">
                        <h2 className="summary-title">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        <div className="summary-total">
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                        <button className="btn btn-primary checkout-btn" onClick={checkoutHandler}>
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
