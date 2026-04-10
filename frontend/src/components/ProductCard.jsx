import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  // Amazon price split (e.g. 19.99 -> 19 and 99)
  const priceParts = product.price.toFixed(2).split('.');

  return (
    <article className="amz-card smooth-transition" aria-labelledby={`product-title-${product._id}`}>
      <Link to={`/product/${product._id}`} className="amz-card-img-wrap smooth-transition" aria-hidden="true" tabIndex={-1}>
        <img src={product.image} alt={product.name} loading="lazy" style={{aspectRatio: '1 / 1', objectFit: 'contain'}} />
      </Link>
      
      <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <h3 id={`product-title-${product._id}`} className="amz-card-title smooth-transition">{product.name}</h3>
      </Link>
      
      <div className="amz-rating-row" aria-label={`Rated ${product.rating} out of 5 stars by ${product.numReviews} users`}>
        {/* Simple star render for demo */}
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < Math.floor(product.rating) ? "#ea580c" : "transparent"} 
            stroke={i < Math.floor(product.rating) ? "#ea580c" : "#d4d4d8"} 
            aria-hidden="true"
          />
        ))}
        <span aria-hidden="true">{product.numReviews}</span>
      </div>

      <div className="amz-price-box" aria-label={`Price: $${product.price.toFixed(2)}`}>
        <span className="amz-price-symbol" aria-hidden="true">$</span>
        <span className="amz-price-whole" aria-hidden="true">{priceParts[0]}</span>
        <span className="amz-price-fraction" aria-hidden="true">{priceParts[1]}</span>
      </div>

      <div className="prime-badge" aria-label="Shemsu Pro Eligible">
         <span aria-hidden="true">&#10003;</span><span aria-hidden="true">PRO</span>
      </div>

      <div>
         <span style={{fontSize: '12px', color: 'var(--amz-text-muted)'}}>FREE delivery <strong>Tomorrow</strong></span>
      </div>
      <div style={{marginTop: '4px'}}>
         <span style={{fontSize: '12px', color: 'var(--amz-text-muted)'}}>Ships to United States</span>
      </div>
    </article>
  );
};

export default ProductCard;
