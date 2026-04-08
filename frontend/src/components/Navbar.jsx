import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Menu, X, Search, Home as HomeIcon, Layers } from 'lucide-react';
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

      <div className="search-container">
        <input type="text" placeholder="Search products..." className="search-input" />
        <button className="search-icon-btn">
          <Search size={16} />
        </button>
      </div>

      <div className="navbar-actions">
        {/* User Icon - Always Visible */}
        {userInfo ? (
          <Link to="/profile" className="nav-icon-link" title="Profile">
             <User size={22} />
          </Link>
        ) : (
          <Link to="/login" className="nav-icon-link" title="Sign In">
             <User size={22} />
          </Link>
        )}

        {/* Cart Icon - Always Visible */}
        <Link to="/cart" className="nav-icon-link" title="Cart">
          <ShoppingCart size={22} />
          {cartItems.length > 0 && (
            <span className="cart-badge" style={{
              position: 'absolute', top: '-8px', right: '-12px', background: 'var(--primary)', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 'bold'
            }}>
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>

        {/* Hamburger Menu Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Slide-out Drawer */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-section">
          <span className="drawer-title">General</span>
          <Link to="/" onClick={closeMenu} className="drawer-link">
             <HomeIcon size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Home
          </Link>
          {userInfo && (
            <button onClick={() => { logoutHandler(); closeMenu(); }} className="drawer-link" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>
               <LogOut size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Sign Out
            </button>
          )}
        </div>

        <div className="drawer-section">
          <span className="drawer-title">Categories</span>
          <Link to="/category/electronics" onClick={closeMenu} className="drawer-link">Electronics</Link>
          <Link to="/category/books" onClick={closeMenu} className="drawer-link">Books</Link>
          <Link to="/category/home-kitchen" onClick={closeMenu} className="drawer-link">Home & Kitchen</Link>
          <Link to="/category/fashion" onClick={closeMenu} className="drawer-link">Fashion</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
