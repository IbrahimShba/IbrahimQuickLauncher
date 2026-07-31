import LinkCard from "../components/LinkCard";

function Dashboard({ links, onOpen, onDelete, onEdit, onToggleFavorite, onReorder }) {
  const favorites = links.filter((l) => l.favorite);

  return (
    <div className="page">
      <h1>Welcome back</h1>
      <p>Your saved links, one click away.</p>

      {favorites.length > 0 && (
        <>
          <h2 className="section-label">Favorites</h2>
          <div className="grid">
            {favorites.map((link) => (
              <LinkCard key={link.id} link={link} allLinks={links} onOpen={onOpen} onDelete={onDelete} onEdit={onEdit} onToggleFavorite={onToggleFavorite} onReorder={onReorder} />
            ))}
          </div>
        </>
      )}

      <h2 className="section-label">All Links</h2>
      {links.length === 0 ? (
        <p className="empty-state">No links yet — head to "Add Link" to save your first one.</p>
      ) : (
        <div className="grid">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} allLinks={links} onOpen={onOpen} onDelete={onDelete} onEdit={onEdit} onToggleFavorite={onToggleFavorite} onReorder={onReorder} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;