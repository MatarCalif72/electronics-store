export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img
        className="product-card-img"
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={e => { e.target.src = `https://picsum.photos/seed/${product.id}/400/300`; }}
      />
      <div className="product-card-body">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-desc">{product.description}</div>
      </div>
      <div className="product-card-footer">
        <div className="product-price">
          ${product.price.toFixed(2)}
          {product.stock < 5 && product.stock > 0 && (
            <span> · Only {product.stock} left</span>
          )}
          {product.stock === 0 && <span> · Out of stock</span>}
        </div>
        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          aria-label={`Add ${product.name} to cart`}
        >
          + Cart
        </button>
      </div>
    </div>
  );
}
