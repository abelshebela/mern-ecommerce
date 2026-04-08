import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../slices/usersApiSlice';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await forgotPassword({ email }).unwrap();
            setMessage(res.message || 'Check your email for a reset link.');
        } catch (err) {
            setError(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Forgot Password</h2>
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {message && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', border: '1px solid var(--primary)', borderRadius: '8px', color: '#4ade80', textAlign: 'center' }}>
                        {message}
                    </div>
                )}

                {error && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '8px', color: '#f87171', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="form-input" 
                        style={{ marginBottom: '1.5rem' }} 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
