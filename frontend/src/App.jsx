import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';

// Persistent cart session ID
const SESSION_ID = (() => {
  let id = localStorage.getItem('cart_session');
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('cart_session', id); }
  return id;
})();

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  });

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/products/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  // Fetch products when search or category changes
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category !== 'All') params.set('category', category);
    fetch(`/api/products?${params}`)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, category]);

  // Fetch cart
  const fetchCart = useCallback(() => {
    fetch(`/api/cart/${SESSION_ID}`)
      .then(r => r.json())
      .then(setCartItems)
      .catch(() => {});
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }

  async function addToCart(product) {
    await fetch(`/api/cart/${SESSION_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: product.id }),
    });
    fetchCart();
    showToast(`${product.name} added to cart!`);
  }

  async function updateQty(item, qty) {
    await fetch(`/api/cart/${SESSION_ID}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty }),
    });
    fetchCart();
  }

  async function removeItem(item) {
    await fetch(`/api/cart/${SESSION_ID}/${item.id}`, { method: 'DELETE' });
    fetchCart();
  }

  function handleAuth(userData, token) {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    showToast(`Welcome, ${userData.name}!`);
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    showToast('Signed out successfully');
  }

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <Navbar
        search={search}
        onSearch={setSearch}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        user={user}
        onAuthOpen={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />

      <section className="hero">
        <h1>Your Tech Universe</h1>
        <p>Discover the latest electronics — phones, laptops, audio, and more.</p>
      </section>

      <CategoryFilter
        categories={categories}
        active={category}
        onSelect={setCategory}
      />

      <ProductGrid
        products={products}
        loading={loading}
        onAddToCart={addToCart}
      />

      {cartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onAuth={handleAuth}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
