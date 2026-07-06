const Statistics = ({ highest }) => {
  return (
    <div className="middle-panel">
      <div className="highest-card">
        <h2>Highest Percentage</h2>

        <h1>{highest.toFixed(2)}%</h1>
      </div>
    </div>
  );
};

export default Statistics;
