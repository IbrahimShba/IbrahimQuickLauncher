import { useState } from "react";
import LinkCard from "../components/LinkCard";
import "./AllLinks.css";

function AllLinks({ links, onOpen, onDelete, onEdit, onToggleFavorite, onReorder, activeCategory, setActiveCategory }) {
  const [search, setSearch] = useState("");

  const categories = ["All", ...new Set(links.map((l) => l.category || "Uncategorized"))];

  // has to match both search text and the active category chip
  const filtered = links.filter((link) => {
    const linkCategory = link.category || "Uncategorized";
    const matchesSearch =
      link.title.toLowerCase().includes(search.toLowerCase()) ||
      link.url.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || activeCategory === "All" || linkCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page">
      <h1>All Links</h1>
      <p>Search or filter to find exactly what you need.</p>

      <input
        className="search-input"
        type="text"
        placeholder="Search by title or URL..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chip-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={(activeCategory === cat || (!activeCategory && cat === "All")) ? "chip active" : "chip"}
            onClick={() => setActiveCategory(cat === "All" ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No links match your search.</p>
      ) : (
        <div className="grid">
          {filtered.map((link) => (
            <LinkCard key={link.id} link={link} allLinks={links} onOpen={onOpen} onDelete={onDelete} onEdit={onEdit} onToggleFavorite={onToggleFavorite} onReorder={onReorder} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllLinks;