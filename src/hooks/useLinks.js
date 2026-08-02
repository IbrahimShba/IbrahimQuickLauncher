import { useState, useEffect } from "react";
import sampleLinks from "../data/sampleLinks";

// all my link data + logic lives here so every page uses the same source
function useLinks() {
  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem("links");
    return saved ? JSON.parse(saved) : sampleLinks;
  });

  // saves to localStorage every time links changes
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  function addLink({ title, url, category }) {
    let fixedUrl = url.trim();
    if (!fixedUrl.startsWith("http://") && !fixedUrl.startsWith("https://")) {
      fixedUrl = "https://" + fixedUrl;
    }
    const newLink = {
      id: Date.now(),
      title,
      url: fixedUrl,
      category: category || "Uncategorized",
      clicks: 0,
      favorite: false,
    };
    setLinks((prev) => [...prev, newLink]);
  }

  function deleteLink(id) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function editLink(id, updatedFields) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l)));
  }

  function toggleFavorite(id) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, favorite: !l.favorite } : l)));
  }

  function openLink(id) {
    const link = links.find((l) => l.id === id);
    if (!link) return;
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, clicks: (l.clicks || 0) + 1 } : l)));
    window.open(link.url, "_blank");
  }

  // puts the dragged link where I dropped it
  function reorderLinks(draggedId, targetId) {
    setLinks((prev) => {
      const draggedIndex = prev.findIndex((l) => l.id === draggedId);
      const targetIndex = prev.findIndex((l) => l.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return prev;
      const updated = [...prev];
      const [draggedItem] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, draggedItem);
      return updated;
    });
  }

  // used by import + reset
  function replaceAllLinks(newLinks) {
    setLinks(newLinks);
  }

  return { links, addLink, deleteLink, editLink, toggleFavorite, openLink, reorderLinks, replaceAllLinks };
}

export default useLinks;