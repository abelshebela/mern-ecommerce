import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Menu, X, Search, ChevronDown } from 'lucide-react';
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

      {/* Amazon-style Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Search products, brands, and more..." className="search-input" />
        <button className="search-icon-btn">
          <Search size={18} />
        </button>
      </div>

      <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        
        {/* Amazon-style Account Section */}
        {userInfo ? (
          <div className="nav-text-container" onClick={() => { /* Potential Dropdown Toggle */ }}>
            <span className="nav-text-top">Hello, {userInfo.name.split(' ')[0]}</span>
            <span className="nav-text-bottom">Account & Lists <ChevronDown size={14} /></span>
            
            {/* Simple logout button for now, can be part of a dropdown later */}
            <button onClick={(e) => { e.stopPropagation(); logoutHandler(); closeMenu(); }} className="btn btn-ghost logout-btn" style={{ marginTop: '0.5rem', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
              <LogOut size={12} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu} className="nav-text-container">
            <span className="nav-text-top">Hello, sign in</span>
            <span className="nav-text-bottom">Account & Lists <ChevronDown size={14} /></span>
          </Link>
        )}

        <Link to="/cart" onClick={closeMenu} className="nav-link cart-link">
          <div style={{ position: 'relative' }}>
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="cart-badge" style={{
                position: 'absolute', top: '-10px', right: '-10px', background: 'var(--primary)', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem', fontWeight: 'bold'
              }}>
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </div>
          <span className="nav-text-bottom">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
