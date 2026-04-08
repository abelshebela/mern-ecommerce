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
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

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
        setSuccessMessage('');
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                setSuccessMessage(res.message);
                // Optionally redirect to a notice page after a few seconds
                setTimeout(() => {
                    navigate('/verification-notice');
                }, 3000);
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
                
                {successMessage && (
                    <div className="alert alert-success" style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--primary)', borderRadius: '8px', color: '#4ade80', textAlign: 'center' }}>
                        {successMessage}
                    </div>
                )}
                
                <form onSubmit={submitHandler}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="form-input" 
                        style={{ marginBottom: '1rem' }} 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        style={{ marginBottom: '1rem' }} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="form-input" 
                        style={{ marginBottom: '1.5rem' }} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'} style={{ color: 'var(--primary)' }}>Login</Link>
                </div>
            </div>
        </div>
    );
};
export default Register;
