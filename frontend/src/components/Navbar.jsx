import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="glass navbar-main">
      <Link to="/" onClick={closeMenu} className="nav-logo">
        <h2 style={{ color: 'var(--primary)', letterSpacing: '1px' }}>MERN<span style={{color: 'var(--text-main)'}}>Commerce</span></h2>
      </Link>

      <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/cart" onClick={closeMenu} className="nav-link cart-link">
          <ShoppingCart size={20} /> <span className="link-text">Cart</span>
          {cartItems.length > 0 && (
            <span className="cart-badge">
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>
        {userInfo ? (
          <div className="user-nav">
            <span className="user-name">{userInfo.name.split(' ')[0]}</span>
            <button onClick={() => { logoutHandler(); closeMenu(); }} className="btn btn-ghost logout-btn">
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu} className="btn btn-primary login-btn">
            <User size={18} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
