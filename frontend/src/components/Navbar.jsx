import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

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

  return (
    <nav className="glass" style={{
      position: 'sticky', top: '10px', zIndex: 50, margin: '10px 20px', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <Link to="/">
        <h2 style={{ color: 'var(--primary)', letterSpacing: '1px' }}>MERN<span style={{color: 'var(--text-main)'}}>Commerce</span></h2>
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', position: 'relative' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>{userInfo.name}</span>
            <button onClick={logoutHandler} className="btn btn-ghost" style={{ padding: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
            <User size={18} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
