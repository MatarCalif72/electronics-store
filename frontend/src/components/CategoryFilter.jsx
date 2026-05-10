export default function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="category-section container">
      <div className="category-list" role="list">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-chip${active === cat ? ' active' : ''}`}
            onClick={() => onSelect(cat)}
            role="listitem"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
