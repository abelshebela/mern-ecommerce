import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useResetPasswordMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await resetPassword({ token, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            alert('Password reset successfully!');
            navigate('/');
        } catch (err) {
            setError(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Set New Password</h2>

                {error && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '8px', color: '#f87171', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler}>
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        className="form-input" 
                        style={{ marginBottom: '1rem' }} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        className="form-input" 
                        style={{ marginBottom: '1.5rem' }} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                        {isLoading ? 'Resetting...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
