import { categoryColor } from "../components/LinkCard";

function Stats({ links }) {
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, l) => sum + (l.clicks || 0), 0);
  // no "most opened" until something actually gets a click
  const mostClicked =
    totalClicks > 0 && links.length
      ? links.reduce((top, l) => ((l.clicks || 0) > (top.clicks || 0) ? l : top), links[0])
      : null;

  const counts = {};
  links.forEach((l) => {
    counts[l.category] = (counts[l.category] || 0) + 1;
  });
  const maxCount = Math.max(1, ...Object.values(counts));

  return (
    <div className="page">
      <h1>Stats</h1>
      <p>A quick overview of your launcher activity.</p>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-number">{totalLinks}</span>
          <span className="stat-label">Total Links</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{totalClicks}</span>
          <span className="stat-label">Total Opens</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{mostClicked ? mostClicked.title : "No opens yet"}</span>
          <span className="stat-label">Most Opened</span>
        </div>
      </div>

      <h2 className="section-label">Links per Category</h2>
      <div className="bar-list">
        {Object.keys(counts).map((cat) => (
          <div className="bar-row" key={cat}>
            <span className="bar-label">{cat}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(counts[cat] / maxCount) * 100}%`, background: categoryColor(cat) }} />
            </div>
            <span className="bar-count">{counts[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;