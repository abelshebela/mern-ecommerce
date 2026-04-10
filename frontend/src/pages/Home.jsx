import { useEffect } from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div style={{background: '#eaeded', minHeight: '100vh', paddingBottom: '20px'}}>
      
      {/* ── Amazon Hero Carousel ── */}
      <div style={{position: 'relative', width: '100%', maxWidth: '1500px', margin: '0 auto'}}>
        <div style={{
          width: '100%', height: '600px', 
          background: 'radial-gradient(circle at 75% 20%, #1f2532 0%, #000000 100%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
           <h1 style={{color: 'white', fontSize: '50px', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>
              Prime Deals: Up to 50% Off Top Tech
           </h1>
        </div>
      </div>

      {/* ── Amazon Mosaic Grid (The classic 4x4 squares) ── */}
      <div className="container" style={{marginTop: '-250px', position: 'relative', zIndex: 10, padding: '0 20px'}}>
        
        {/* Row 1: The Category Squares */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', 
          marginBottom: '20px'
        }}>
           
           <div className="amz-category-card">
              <h3>Gaming Accessories</h3>
              <div className="amz-category-grid">
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1593152167544-085d3b9c4938" alt="Headset"/><span>Headsets</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f" alt="Keyboard"/><span>Keyboards</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1615663245857-ac1eeb536fcb" alt="Mouse"/><span>Mice</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef" alt="Chair"/><span>Chairs</span></div>
              </div>
              <Link to="/" className="amz-link-more">See more</Link>
           </div>

           <div className="amz-category-card">
              <h3>Refresh your space</h3>
              <div className="amz-category-grid">
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92" alt="Home"/><span>Dining</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1574269909862-7e1d70bb8078" alt="Decor"/><span>Home</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe" alt="Kitchen"/><span>Kitchen</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1605774337667-1d51179f8e4e" alt="Bath"/><span>Bath</span></div>
              </div>
              <Link to="/" className="amz-link-more">See more</Link>
           </div>

           <div className="amz-category-card">
              <h3>Shop deals in Fashion</h3>
              <div className="amz-category-grid">
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" alt="Jeans"/><span>Jeans under $50</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1608228079968-c7681eaef814" alt="Tops"/><span>Tops under $25</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1550614000-4b95d4edae1f" alt="Dresses"/><span>Dresses under $30</span></div>
                 <div className="amz-cat-item"><img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2" alt="Shoes"/><span>Shoes under $50</span></div>
              </div>
              <Link to="/" className="amz-link-more">See all deals</Link>
           </div>

           <div className="amz-sign-in-card">
              <h2>Sign in for the best experience</h2>
              <button className="btn-amz" style={{width: '100%', marginBottom: '10px'}}>Sign in securely</button>
           </div>

        </div>

        {/* ── The Horizontal Scroller (Simulated Grid) ── */}
        <div style={{background: 'white', padding: '20px', marginBottom: '20px'}}>
           <h2 style={{fontSize: '21px', margin: '0 0 10px 0', fontWeight: 'bold'}}>Best Sellers in Electronics</h2>
           {isLoading ? (
             <div style={{display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '15px'}}>
               {[...Array(5)].map((_, i) => (
                 <div key={i} className="skeleton-card" style={{minWidth: '280px'}}>
                   <div className="skeleton skeleton-img"></div>
                   <div className="skeleton skeleton-text"></div>
                   <div className="skeleton skeleton-text short"></div>
                   <div className="skeleton skeleton-text"></div>
                 </div>
               ))}
             </div>
           ) : error ? (
             <div style={{color:'red'}}>{error?.data?.message || 'Error'}</div>
           ) : (
             <div style={{display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '15px'}}>
               {products.map(p => (
                 <ProductCard key={p._id} product={p} />
               ))}
             </div>
           )}
        </div>

      </div>

      {/* ── Realistic Amazon Footer ── */}
      <footer style={{marginTop: '40px'}}>
         <div style={{background: '#37475A', color: 'white', textAlign: 'center', padding: '15px', cursor: 'pointer'}} onClick={() => window.scrollTo(0,0)}>
            Back to top
         </div>
         <div style={{background: '#232f3e', color: 'white', padding: '40px 0'}}>
            <div className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px'}}>
               <div>
                  <h4 style={{marginBottom: '10px', fontSize: '16px'}}>Get to Know Us</h4>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#dddddd', lineHeight: '2.2', fontSize:'14px'}}>
                     <li>Careers</li>
                     <li>Blog</li>
                     <li>About Shemsu Suk</li>
                     <li>Investor Relations</li>
                  </ul>
               </div>
               <div>
                  <h4 style={{marginBottom: '10px', fontSize: '16px'}}>Make Money with Us</h4>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#dddddd', lineHeight: '2.2', fontSize:'14px'}}>
                     <li>Sell products on Shemsu Suk</li>
                     <li>Sell on Shemsu Suk Business</li>
                     <li>Become an Affiliate</li>
                     <li>Advertise Your Products</li>
                  </ul>
               </div>
               <div>
                  <h4 style={{marginBottom: '10px', fontSize: '16px'}}>Shemsu Suk Payment Products</h4>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#dddddd', lineHeight: '2.2', fontSize:'14px'}}>
                     <li>Shemsu Suk Business Card</li>
                     <li>Shop with Points</li>
                     <li>Reload Your Balance</li>
                     <li>Shemsu Suk Currency Converter</li>
                  </ul>
               </div>
               <div>
                  <h4 style={{marginBottom: '10px', fontSize: '16px'}}>Let Us Help You</h4>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, color: '#dddddd', lineHeight: '2.2', fontSize:'14px'}}>
                     <li>Shemsu Suk and COVID-19</li>
                     <li>Your Account</li>
                     <li>Your Orders</li>
                     <li>Shipping Rates &amp; Policies</li>
                     <li>Returns &amp; Replacements</li>
                  </ul>
               </div>
            </div>
         </div>
         <div style={{background: '#131921', color: '#dddddd', textAlign: 'center', padding: '20px 0', fontSize: '12px'}}>
            <div style={{marginBottom: '5px'}}>Conditions of Use &nbsp;&nbsp; Privacy Notice &nbsp;&nbsp; Consumer Health Data Privacy Disclosure</div>
            <div>© 1996-2026, Shemsu Suk.com, Inc. or its affiliates</div>
         </div>
      </footer>

    </div>
  );
};

export default Home;
