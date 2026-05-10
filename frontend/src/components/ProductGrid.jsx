import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading, onAddToCart }) {
  if (loading) return <div className="loading">Loading products...</div>;

  if (products.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <p>No products found. Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="products-section container">
      <div className="products-header">
        <span className="products-count">{products.length} product{products.length !== 1 ? 's' : ''} found</span>
      </div>
      <div className="product-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}
