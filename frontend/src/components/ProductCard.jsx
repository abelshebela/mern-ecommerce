import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="glass" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', transition: 'transform 0.3s ease', cursor: 'pointer' }} 
         onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
         onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      </Link>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to={`/product/${product._id}`}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem', color: '#fbbf24', fontSize: '0.9rem' }}>
          <Star size={16} fill="#fbbf24" stroke="none" />
          <span>{product.rating}</span>
          <span style={{ color: 'var(--text-muted)', marginLeft: '0.2rem' }}>({product.numReviews} reviews)</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
