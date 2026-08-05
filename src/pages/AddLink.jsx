import { useState } from "react";
import "./AddLink.css";

function AddLink({ onAdd, links }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);

  const existingCategories = [...new Set(links.map((l) => l.category))];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !url) return;

    const finalCategory = isNewCategory ? newCategory.trim() : category;
    onAdd({ title, url, category: finalCategory });

    setTitle("");
    setUrl("");
    setCategory("");
    setNewCategory("");
    setIsNewCategory(false);
  };

  return (
    <div className="page">
      <h1>Add a New Link</h1>
      <p>Save a website to your dashboard.</p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Title
          <input type="text" placeholder="e.g. Google" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          URL
          <input type="text" placeholder="e.g. google.com" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>

        <label>
          Category
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
              <button type="button" className="chip" onClick={() => { setIsNewCategory(false); setNewCategory(""); }}>
                Cancel
              </button>
            </div>
          )}
        </label>

        <button type="submit">Add Link</button>
      </form>
    </div>
  );
}

export default AddLink;