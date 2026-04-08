import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, Menu, X, Search, Home as HomeIcon } from 'lucide-react';
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

  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu = () => setMenuOpen(false);

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <>
      {/* Backdrop overlay for drawer on mobile */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed', inset: 0, zIndex: 998,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <nav className="glass navbar-main">
        {/* ── Logo ── */}
        <Link to="/" onClick={closeMenu} className="nav-logo">
          <span className="logo-mern">MERN</span><span className="logo-commerce">Commerce</span>
        </Link>

        {/* ── Search (desktop only) ── */}
        <div className="nav-search">
          <input type="text" placeholder="Search products, brands…" className="search-input" />
          <button className="search-icon-btn" aria-label="Search">
            <Search size={16} />
          </button>
        </div>

        {/* ── Right-side actions ── */}
        <div className="navbar-actions">

          {/* Sign In / Account — desktop label visible, mobile hidden */}
          {userInfo ? (
            <button onClick={() => { logoutHandler(); }} className="nav-action-btn desktop-only" title="Sign Out">
              <User size={20} />
              <span className="nav-action-label">{userInfo.name.split(' ')[0]}</span>
            </button>
          ) : (
            <Link to="/login" className="nav-action-btn desktop-only" title="Sign In">
              <User size={20} />
              <span className="nav-action-label">Sign In</span>
            </Link>
          )}

          {/* Cart — always icon, desktop shows label */}
          <Link to="/cart" className="nav-action-btn cart-btn" title="Cart">
            <div className="cart-icon-wrap">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
            <span className="nav-action-label">Cart</span>
          </Link>

          {/* Hamburger — always visible */}
          <button className="hamburger-btn" onClick={toggleMenu} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Slide-out Drawer ── */}
        <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
          <div className="drawer-section">
            <span className="drawer-title">General</span>
            <Link to="/" onClick={closeMenu} className="drawer-link">
              <HomeIcon size={16} /> Home
            </Link>
            {!userInfo && (
              <Link to="/login" onClick={closeMenu} className="drawer-link">
                <User size={16} /> Sign In
              </Link>
            )}
            {userInfo && (
              <button
                onClick={() => { logoutHandler(); closeMenu(); }}
                className="drawer-link drawer-btn"
              >
                <LogOut size={16} /> Sign Out
              </button>
            )}
          </div>

          <div className="drawer-section">
            <span className="drawer-title">Categories</span>
            <Link to="/category/electronics" onClick={closeMenu} className="drawer-link">Electronics</Link>
            <Link to="/category/books" onClick={closeMenu} className="drawer-link">Books</Link>
            <Link to="/category/home-kitchen" onClick={closeMenu} className="drawer-link">Home &amp; Kitchen</Link>
            <Link to="/category/fashion" onClick={closeMenu} className="drawer-link">Fashion</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
