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

    const [login, { isLoading }] = useLoginMutation();

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
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h2>
                <form onSubmit={submitHandler}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="form-input" 
                        style={{ marginBottom: '1rem' }} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="form-input" 
                        style={{ marginBottom: '1.5rem' }} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Login'}
                    </button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    New Customer? <Link to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'} style={{ color: 'var(--primary)' }}>Register</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;
