export default function Cart({ items, onClose, onUpdateQty, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <aside className="cart-drawer" aria-label="Shopping cart">
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍️</div>
              <p>Your cart is empty.</p>
              <p style={{ fontSize: '0.82rem', marginTop: '0.4rem' }}>Add some products to get started!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img className="cart-item-img" src={item.image} alt={item.name}
                  onError={e => { e.target.src = `https://picsum.photos/seed/${item.product_id}/400/300`; }} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div className="cart-qty">
                  <button className="qty-btn" onClick={() => onUpdateQty(item, item.quantity - 1)}>−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => onUpdateQty(item, item.quantity + 1)}>+</button>
                  <button className="qty-btn" onClick={() => onRemove(item)} aria-label="Remove item" style={{ marginLeft: '0.25rem' }}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={() => alert('Checkout coming soon!')}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
