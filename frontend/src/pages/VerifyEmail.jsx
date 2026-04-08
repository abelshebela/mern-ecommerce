import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useVerifyEmailMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const [verifyEmail] = useVerifyEmailMutation();

  useEffect(() => {
    const performVerification = async () => {
      try {
        const res = await verifyEmail(token).unwrap();
        dispatch(setCredentials({ ...res }));
        setStatus('success');
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (err) {
        setStatus('error');
        setErrorMsg(err?.data?.message || 'Verification failed. The link may be invalid or expired.');
      }
    };

    if (token) {
      performVerification();
    }
  }, [token, verifyEmail, dispatch, navigate]);

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
      <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
        {status === 'verifying' && (
          <>
            <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <h2>Verifying Your Email...</h2>
            <p style={{ color: 'var(--text-muted)' }}>Please wait while we activate your account.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ fontSize: '4rem', color: '#4ade80', marginBottom: '1.5rem' }}>✅</div>
            <h2 style={{ marginBottom: '1rem' }}>Email Verified!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Your account is now active. You are being redirected to the homepage...
            </p>
            <Link to="/" className="btn btn-primary" style={{ width: '100%' }}>Go Now</Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ fontSize: '4rem', color: '#ef4444', marginBottom: '1.5rem' }}>❌</div>
            <h2 style={{ marginBottom: '1rem' }}>Verification Failed</h2>
            <p style={{ color: '#ef4444', marginBottom: '2rem' }}>{errorMsg}</p>
            <Link to="/register" className="btn btn-primary" style={{ width: '100%' }}>Try Registering Again</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
