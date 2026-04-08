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
    <nav className="glass" style={{
      position: 'sticky', top: '10px', zIndex: 100, margin: '10px 20px', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <Link to="/" onClick={closeMenu}>
        <h2 style={{ color: 'var(--primary)', letterSpacing: '1px' }}>MERN<span style={{color: 'var(--text-main)'}}>Commerce</span></h2>
      </Link>

      {/* Mobile Toggle */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`} style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        alignItems: 'center',
        transition: 'all 0.3s ease-in-out'
      }}>
        <Link to="/cart" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', position: 'relative' }}>
          <ShoppingCart size={20} /> Cart
          {cartItems.length > 0 && (
            <span style={{
              position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem'
            }}>
              {cartItems.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>
        {userInfo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', className: 'user-nav' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{userInfo.name.split(' ')[0]}</span>
            <button onClick={() => { logoutHandler(); closeMenu(); }} className="btn btn-ghost" style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            <User size={18} /> Sign In
          </Link>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .nav-links {
            position: fixed;
            top: 80px;
            left: 20px;
            right: 20px;
            flex-direction: column;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--border);
            transform: translateY(-120%);
            opacity: 0;
            pointer-events: none;
          }
          .nav-links.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .user-nav { flex-direction: column; width: 100%; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
