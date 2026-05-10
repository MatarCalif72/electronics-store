import SearchBar from './SearchBar';

export default function Navbar({ search, onSearch, cartCount, onCartOpen, user, onAuthOpen, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">Electro<span>Shop</span></div>

        <div className="navbar-search">
          <SearchBar value={search} onChange={onSearch} />
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="btn btn-ghost" style={{ fontSize: '0.8rem' }}>Hi, {user.name.split(' ')[0]}</span>
              <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button className="btn btn-ghost" onClick={onAuthOpen}>Sign In</button>
          )}

          <button className="btn-icon" onClick={onCartOpen} aria-label="Open cart">
            🛒
            {cartCount > 0 && <span className="badge">{cartCount > 9 ? '9+' : cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}
