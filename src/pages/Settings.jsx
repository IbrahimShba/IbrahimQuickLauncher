import { useRef } from "react";

function Settings({ theme, setTheme, bgImage, setBgImage, links, replaceAllLinks, resetAll }) {
  const fileInputRef = useRef(null);
  const importInputRef = useRef(null);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2MB (browser storage has a size limit).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setBgImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handleExport() {
    const backup = { links, theme, bgImage };
    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ibrahimquicklauncher-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        // works with old links-only backups too, not just the new full format
        const importedLinks = Array.isArray(imported) ? imported : imported.links;
        if (!Array.isArray(importedLinks)) throw new Error("Invalid file");

        const confirmed = window.confirm(
          `This will replace your current data with the imported backup (${importedLinks.length} links). Continue?`
        );
        if (!confirmed) return;

        replaceAllLinks(importedLinks);
        if (!Array.isArray(imported)) {
          if (imported.theme) setTheme(imported.theme);
          if (typeof imported.bgImage === "string") setBgImage(imported.bgImage);
        }
      } catch {
        alert("That file doesn't look like a valid backup file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleReset() {
    const confirmed = window.confirm(
      "This will delete all your links and reset appearance back to the starting demo. This can't be undone. Continue?"
    );
    if (confirmed) resetAll();
  }

  return (
    <div className="page">
      <h1>Settings</h1>
      <p>Customize how your launcher looks, and back up your data.</p>

      <h2 className="section-label">Appearance</h2>
      <div className="settings-row">
        <button className={theme === "dark" ? "chip active" : "chip"} onClick={() => setTheme("dark")}>🌙 Dark</button>
        <button className={theme === "light" ? "chip active" : "chip"} onClick={() => setTheme("light")}>☀️ Light</button>
      </div>

      <h2 className="section-label">Background Image</h2>
      <div className="settings-row">
        <button className="chip" onClick={() => fileInputRef.current.click()}>Upload Image</button>
        {bgImage && <button className="chip" onClick={() => setBgImage("")}>Remove Background</button>}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
      </div>
      {bgImage && <img src={bgImage} alt="Background preview" className="bg-preview" />}

      <h2 className="section-label">Backup & Transfer</h2>
      <p className="settings-hint">
        Export includes your links, theme, and background image — import it on another PC to get everything back exactly as it was.
      </p>
      <div className="settings-row">
        <button className="chip" onClick={handleExport}>⬇️ Export Backup</button>
        <button className="chip" onClick={() => importInputRef.current.click()}>⬆️ Import Backup</button>
        <input ref={importInputRef} type="file" accept="application/json" onChange={handleImport} style={{ display: "none" }} />
      </div>

      <h2 className="section-label">Danger Zone</h2>
      <p className="settings-hint">Wipe everything and start over — deletes all links and resets appearance to default.</p>
      <div className="settings-row">
        <button className="chip danger" onClick={handleReset}>🗑️ Reset Everything</button>
      </div>
    </div>
  );
}

export default Settings;