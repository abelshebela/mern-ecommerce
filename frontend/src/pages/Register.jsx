import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading, error: err }] = useRegisterMutation();

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
        setError('');
        
        if (password !== confirmPassword) {
            setError('Passwords must match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                // Amazon automatically logs you in if successful
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div style={{background: 'white', minHeight: '100vh'}}>
            <div className="amz-auth-container">
                <Link to="/" style={{textDecoration: 'none'}}>
                   <div className="amz-auth-logo">Shemsu<span>PRO</span></div>
                </Link>

                <div className="amz-auth-box">
                    <h1>Create account</h1>
                    
                    {(error || err) && (
                        <div style={{ marginBottom: '15px', color: '#c40000', fontSize: '13px' }}>
                            <span style={{fontWeight: 'bold'}}>There was a problem</span><br/>
                            {error || err?.data?.message || err.error}
                        </div>
                    )}
                    
                    <form onSubmit={submitHandler}>
                        <label className="amz-auth-label">Your name</label>
                        <input 
                            type="text" 
                            placeholder="First and last name"
                            className="amz-auth-input" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label className="amz-auth-label">Mobile number or email</label>
                        <input 
                            type="email" 
                            className="amz-auth-input" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <label className="amz-auth-label">Password</label>
                        <input 
                            type="password" 
                            placeholder="At least 6 characters"
                            className="amz-auth-input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <label className="amz-auth-label">Re-enter password</label>
                        <input 
                            type="password" 
                            className="amz-auth-input" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        
                        <button type="submit" className="btn-amz" style={{ width: '100%', padding: '8px', fontSize: '13px', background: '#f0c14b', borderColor: '#a88734 #9c7e31 #846a29' }} disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Continue'}
                        </button>
                    </form>

                    <div style={{fontSize: '12px', marginTop: '15px', lineHeight: '1.5'}}>
                        By creating an account, you agree to Shemsu's <Link to="/" style={{color: '#007185'}}>Conditions of Use</Link> and <Link to="/" style={{color: '#007185'}}>Privacy Notice</Link>.
                    </div>
                    
                    <div className="amz-auth-divider" style={{width: '100%', margin: '20px 0 15px 0'}}></div>
                    
                    <div style={{fontSize: '13px'}}>
                        Already have an account? <Link to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'} style={{color: '#007185'}}>Sign in &#9656;</Link>
                    </div>
                </div>
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
export default Register;
