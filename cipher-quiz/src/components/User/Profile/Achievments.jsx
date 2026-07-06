const Achievements = ({ stats }) => {
  return (
    <div className="right-panel">
      <div className="badge">
        <h2>⭐ Golden Stars</h2>

        <p>{stats.gold}</p>
      </div>

      <div className="badge">
        <h2>🥈 Silver Spoon</h2>

        <p>{stats.silver}</p>
      </div>

      <div className="badge">
        <h2>🥉 Bronze Cup</h2>

        <p>{stats.bronze}</p>
      </div>
    </div>
  );
};

export default Achievements;
