import { categoryColor } from "../components/LinkCard";
import "./Categories.css";

function Categories({ links, setActiveCategory, goToAllLinks }) {
  const counts = {};
  links.forEach((l) => {
    const cat = l.category || "Uncategorized";
    counts[cat] = (counts[cat] || 0) + 1;
  });

  const categories = Object.keys(counts);

  function handleClick(category) {
    setActiveCategory(category);
    goToAllLinks();
  }

  return (
    <div className="page">
      <h1>Categories</h1>
      <p>Browse your links grouped by category.</p>

      {categories.length === 0 ? (
        <p className="empty-state">No categories yet — add a link to get started.</p>
      ) : (
        <div className="category-grid">
          {categories.map((cat) => (
            <button key={cat} className="category-card" style={{ borderTopColor: categoryColor(cat) }} onClick={() => handleClick(cat)}>
              <span className="category-name">{cat}</span>
              <span className="category-count">{counts[cat]} link{counts[cat] !== 1 ? "s" : ""}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;