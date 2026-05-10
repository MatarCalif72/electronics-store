import { useRef } from 'react';

export default function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);

  return (
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
}
