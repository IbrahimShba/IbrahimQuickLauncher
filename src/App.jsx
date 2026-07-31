import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddLink from "./pages/AddLink";
import AllLinks from "./pages/AllLinks";
import Categories from "./pages/Categories";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import useLinks from "./hooks/useLinks";
import sampleLinks from "./data/sampleLinks";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [activeCategory, setActiveCategory] = useState(null);

  const { links, addLink, deleteLink, editLink, toggleFavorite, openLink, reorderLinks, replaceAllLinks } = useLinks();

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [bgImage, setBgImage] = useState(() => localStorage.getItem("bgImage") || "");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("bgImage", bgImage);
  }, [bgImage]);

  function goToPage(page) {
    if (page === "All Links") setActiveCategory(null);
    setCurrentPage(page);
  }

  function resetAll() {
    const freshLinks = sampleLinks.map((l) => ({ ...l, clicks: 0, favorite: false }));
    replaceAllLinks(freshLinks);
    setTheme("light");
    setBgImage("");
  }

  const wrapperStyle = bgImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }
    : {};

  return (
    <div className="app-wrapper" style={wrapperStyle}>
      <div className="app">
        <Navbar currentPage={currentPage} setCurrentPage={goToPage} />

        <main>
          {currentPage === "Dashboard" && (
            <Dashboard links={links} onOpen={openLink} onDelete={deleteLink} onEdit={editLink} onToggleFavorite={toggleFavorite} onReorder={reorderLinks} />
          )}

          {currentPage === "Add Link" && <AddLink onAdd={addLink} links={links} />}

          {currentPage === "All Links" && (
            <AllLinks
              links={links}
              onOpen={openLink}
              onDelete={deleteLink}
              onEdit={editLink}
              onToggleFavorite={toggleFavorite}
              onReorder={reorderLinks}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}

          {currentPage === "Categories" && (
            <Categories links={links} setActiveCategory={setActiveCategory} goToAllLinks={() => setCurrentPage("All Links")} />
          )}

          {currentPage === "Stats" && <Stats links={links} />}

          {currentPage === "Settings" && (
            <Settings
              theme={theme}
              setTheme={setTheme}
              bgImage={bgImage}
              setBgImage={setBgImage}
              links={links}
              replaceAllLinks={replaceAllLinks}
              resetAll={resetAll}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;