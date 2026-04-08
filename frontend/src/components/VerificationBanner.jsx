import { useSelector } from 'react-redux';

const VerificationBanner = () => {
    const { userInfo } = useSelector((state) => state.auth);

    if (!userInfo || userInfo.isVerified) {
        return null;
    }

    return (
        <div style={{
            backgroundColor: 'rgba(234, 179, 8, 0.2)',
            borderBottom: '1px solid var(--primary)',
            padding: '0.75rem 1rem',
            textAlign: 'center',
            color: '#facc15',
            fontSize: '0.9rem',
            zIndex: 1000,
            position: 'relative'
        }}>
            ⚠️ Your account is not verified. Please check your email and click the verification link to unlock all features.
        </div>
    );
};

export default VerificationBanner;
