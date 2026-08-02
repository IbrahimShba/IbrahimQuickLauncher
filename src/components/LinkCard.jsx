import { useState } from "react";

function LinkCard({ link, allLinks, onOpen, onDelete, onEdit, onToggleFavorite, onReorder }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [category, setCategory] = useState(link.category);
  const [newCategory, setNewCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);

  // building the favicon url from the domain
  const domain = link.url.replace(/^https?:\/\//, "").split("/")[0];
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const existingCategories = [...new Set((allLinks || []).map((l) => l.category))];

  const handleSave = (e) => {
    e.stopPropagation();
    let fixedUrl = url.trim();
    if (!fixedUrl.startsWith("http://") && !fixedUrl.startsWith("https://")) {
      fixedUrl = "https://" + fixedUrl;
    }
    const finalCategory = (isNewCategory ? newCategory.trim() : category.trim()) || "Uncategorized";
    onEdit(link.id, { title, url: fixedUrl, category: finalCategory });
    setIsEditing(false);
    setIsNewCategory(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Delete "${link.title}"? This can't be undone.`);
    if (confirmed) onDelete(link.id);
  };

  // grip handle starts the drag, card itself is the drop zone
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", link.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // needed or the browser won't allow dropping
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const draggedId = Number(e.dataTransfer.getData("text/plain"));
    onReorder(draggedId, link.id);
  };

  if (isEditing) {
    return (
      <div className="card editing" onClick={(e) => e.stopPropagation()}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />

        {!isNewCategory ? (
          <select
            value={category}
            onChange={(e) => {
              if (e.target.value === "__new__") {
                setIsNewCategory(true);
                setCategory("");
              } else {
                setCategory(e.target.value);
              }
            }}
          >
            <option value="">Select a category...</option>
            {existingCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="__new__">+ Create new category</option>
          </select>
        ) : (
          <div className="new-category-row">
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="button" onClick={() => { setIsNewCategory(false); setNewCategory(""); }}>
              Cancel
            </button>
          </div>
        )}

        <div className="card-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => { setIsEditing(false); setIsNewCategory(false); }}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`card${isDragOver ? " drag-over" : ""}`}
      style={{ borderLeftColor: categoryColor(link.category) }}
      onClick={() => onOpen(link.id)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span
        className="drag-handle"
        draggable
        onDragStart={handleDragStart}
        onClick={(e) => e.stopPropagation()}
        title="Drag to reorder"
      >
        ⠿
      </span>

      <img src={faviconUrl} alt="" className="favicon" />
      <div className="card-info">
        <h3>{link.title}</h3>
        <p>{link.category}</p>
      </div>

      <button
        className={link.favorite ? "star active" : "star"}
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(link.id); }}
        title="Toggle favorite"
      >
        {link.favorite ? "★" : "☆"}
      </button>

      <div className="card-actions">
        <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

// gives each category the same color everywhere, based on its name
export function categoryColor(category) {
  const palette = ["#5B6EF5", "#FF7A50", "#28C7A6", "#F5B94F", "#B565F0", "#4FB6F5"];
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = category.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

export default LinkCard;