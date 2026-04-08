import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Latest Arrivals</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
          {error?.data?.message || error.error}
        </div>
      ) : (
        <div className="grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
