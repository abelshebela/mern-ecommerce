import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingCart, MapPin, Menu, X } from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <header className="smooth-transition" style={{
        position: 'sticky', 
        top: 0, 
        zIndex: 50,
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.4)' : 'none'
    }}>
      {/* ── Top Bar ── */}
      <div className="navbar-top" style={{boxShadow: 'none'}}>
        
        {/* Mobile Hamburger Trigger */}
        <button 
           className="mobile-menu-trigger hide-on-desktop" 
           onClick={() => setIsMobileMenuOpen(true)}
           aria-label="Open Menu"
           style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '5px'}}
        >
           <Menu size={28} />
        </button>

        <Link to="/" className="nav-logo-box" aria-label="Shemsu Home">
          Shemsu
          <span className="logo-prime-tick">PRO</span>
        </Link>
        
        <div className="nav-global-location hide-on-mobile">
           <MapPin size={18} style={{marginTop: '8px'}} aria-hidden="true" />
           <div className="nav-loc-text">
             <span className="nav-loc-top">Deliver to</span>
             <span className="nav-loc-bot">United States</span>
           </div>
        </div>

        {/* ── Search Bar ── */}
        <div className="nav-search-fill">
          <label htmlFor="search-category" className="sr-only">Search Category</label>
          <select id="search-category" className="search-select" aria-label="Search Category">
            <option>All</option>
            <option>Electronics</option>
            <option>Computers</option>
          </select>
          <label htmlFor="search-input" className="sr-only">Search Shemsu</label>
          <input id="search-input" type="text" className="search-input" placeholder="Search Shemsu" />
          <button className="search-btn" aria-label="Submit Search">
            <Search size={22} />
          </button>
        </div>

        {/* ── Right Actions ── */}
        <div className="nav-actions">
          
          <div className="nav-link-box hide-on-mobile" tabIndex={0}>
            <span className="nav-link-top">EN</span>
            <span className="nav-link-bot">US</span>
          </div>

          {userInfo ? (
            <button className="nav-link-box" onClick={logoutHandler} style={{background:'none', border:'1px solid transparent'}} tabIndex={0} aria-label={`Sign out ${userInfo.name}`}>
              <span className="nav-link-top">Hello, {userInfo.name.split(' ')[0]}</span>
              <span className="nav-link-bot">Sign Out</span>
            </button>
          ) : (
            <Link to="/login" className="nav-link-box" tabIndex={0}>
              <span className="nav-link-top">Hello, sign in</span>
              <span className="nav-link-bot">Account &amp; Lists</span>
            </Link>
          )}

          <div className="nav-link-box hide-on-mobile" tabIndex={0}>
            <span className="nav-link-top">Returns</span>
            <span className="nav-link-bot">&amp; Orders</span>
          </div>

          <Link to="/cart" className="cart-box" aria-label={`View Cart, ${cartCount} items`}>
            <ShoppingCart size={32} aria-hidden="true" />
            <span className="cart-count">{cartCount}</span>
            <span className="cart-label hide-on-mobile">Cart</span>
          </Link>
          
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="navbar-bottom hide-on-mobile">
        <button className="nav-bot-link" style={{background:'none'}}><Menu size={18} aria-hidden="true"/> All</button>
        <Link to="/" className="nav-bot-link">Today's Deals</Link>
        <Link to="/" className="nav-bot-link">Customer Service</Link>
        <Link to="/" className="nav-bot-link">Registry</Link>
        <Link to="/" className="nav-bot-link">Gift Cards</Link>
        <Link to="/" className="nav-bot-link">Sell</Link>
      </div>

      {/* ── Mobile Off-Canvas Menu ── */}
      {isMobileMenuOpen && (
         <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      <div className={`mobile-drawer smooth-transition ${isMobileMenuOpen ? 'open' : ''}`}>
         <div className="drawer-header">
            <h3>Hello, {userInfo ? userInfo.name : 'sign in'}</h3>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close Menu">
               <X size={28} />
            </button>
         </div>
         <nav className="drawer-nav">
             <h4>Trending</h4>
             <Link to="/">Best Sellers</Link>
             <Link to="/">New Releases</Link>
             <h4>Categories</h4>
             <Link to="/">Electronics</Link>
             <Link to="/">Computers</Link>
             <Link to="/">Smart Home</Link>
         </nav>
      </div>
    </header>
  );
};

export default Navbar;
