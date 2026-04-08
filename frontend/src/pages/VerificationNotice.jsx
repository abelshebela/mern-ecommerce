import { Link } from 'react-router-dom';

const VerificationNotice = () => {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }}>
      <div className="glass" style={{ padding: '3rem', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📧</div>
        <h2 style={{ marginBottom: '1rem' }}>Verify Your Email</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
          We've sent a verification link to your email address. 
          Please check your inbox (and your spam folder) to activate your account.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
            Go to Login
          </Link>
          <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificationNotice;
