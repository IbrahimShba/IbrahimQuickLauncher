import { useState } from "react";

function Navbar({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = ["Dashboard", "Add Link", "All Links", "Categories", "Stats", "Settings"];

  function handleSelect(page) {
    setCurrentPage(page);
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <h2 className="logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="6" fill="var(--accent)" />
            <path d="M13 3L6 14h5l-1 7 8-11h-5l1-7z" fill="white" />
          </svg>
          IbrahimQuickLauncher
        </h2>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={menuOpen ? "nav-links open" : "nav-links"}>
        {pages.map((page) => (
          <button key={page} className={currentPage === page ? "nav-btn active" : "nav-btn"} onClick={() => handleSelect(page)}>
            {page}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;