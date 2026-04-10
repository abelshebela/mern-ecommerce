import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading, error: err }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{background: 'white', minHeight: '100vh'}}>
            <div className="amz-auth-container">
                <Link to="/" style={{textDecoration: 'none'}}>
                   <div className="amz-auth-logo">Shemsu<span>PRO</span></div>
                </Link>

                <div className="amz-auth-box">
                    <h1>Sign in</h1>
                    
                    {err && (
                        <div style={{ marginBottom: '15px', color: '#c40000', fontSize: '13px' }}>
                            <span style={{fontWeight: 'bold'}}>There was a problem</span><br/>
                            {err?.data?.message || err.error}
                        </div>
                    )}
                    
                    <form onSubmit={submitHandler}>
                        <label className="amz-auth-label">Email or mobile phone number</label>
                        <input 
                            type="email" 
                            className="amz-auth-input" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                           <label className="amz-auth-label">Password</label>
                           <Link to="/forgot-password" style={{color: '#007185', fontSize: '12px', marginBottom: '4px'}}>Forgot your password?</Link>
                        </div>
                        <input 
                            type="password" 
                            className="amz-auth-input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <button type="submit" className="btn-amz" style={{ width: '100%', padding: '8px', fontSize: '13px', background: '#f0c14b', borderColor: '#a88734 #9c7e31 #846a29' }} disabled={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign in'}
                        </button>
                    </form>

                    <div style={{fontSize: '12px', marginTop: '15px', lineHeight: '1.5'}}>
                        By continuing, you agree to Shemsu's <Link to="/" style={{color: '#007185'}}>Conditions of Use</Link> and <Link to="/" style={{color: '#007185'}}>Privacy Notice</Link>.
                    </div>
                </div>

                <div className="amz-auth-divider" style={{width: '350px'}}>
                    <span>New to Shemsu?</span>
                </div>

                <Link to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'} className="btn-amz-create" style={{width: '350px'}}>
                    Create your Shemsu account
                </Link>
            </div>
            <div style={{borderTop: '1px solid #ddd', padding: '30px 0', background: '#fafafa', textAlign: 'center', fontSize: '11px', color: '#555', marginTop: 'auto'}}>
                <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px'}}>
                   <Link to="/" style={{color: '#007185'}}>Conditions of Use</Link>
                   <Link to="/" style={{color: '#007185'}}>Privacy Notice</Link>
                   <Link to="/" style={{color: '#007185'}}>Help</Link>
                </div>
                <div>© 1996-2026, Shemsu.com, Inc. or its affiliates</div>
            </div>
        </div>
    );
};
export default Login;
