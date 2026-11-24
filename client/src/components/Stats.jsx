export default function Stats({ stats }) {
  if (!stats) return <p>Loading statistics...</p>;

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total: {stats.total} | Read: {stats.read} | Unread: {stats.unread}</p>
      <p>Average rating: {stats.averageRating ?? 'no ratings yet'}</p>
      <ul>
        {Object.entries(stats.byGenre).map(([genre, count]) => (
          <li key={genre}>{genre}: {count}</li>
        ))}
      </ul>
    </div>
  );
}