export default function BookList({ books, loading, error, busy, onToggleRead, onRate, onEdit, onDelete }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (books.length === 0) return <p>No books found.</p>;

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <strong>{book.title}</strong> by {book.author} ({book.year}) - {book.genre}

          <label>
            <input
              type="checkbox"
              checked={book.read}
              disabled={busy}
              onChange={() => onToggleRead(book)}
            />
            Read
          </label>

          <select
            value={book.rating ?? ''}
            disabled={!book.read || busy}
            onChange={(e) => onRate(book, e.target.value)}
          >
            <option value="">No rating</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          <button onClick={() => onEdit(book)} disabled={busy}>Edit</button>
          <button onClick={() => onDelete(book)} disabled={busy}>Delete</button>
        </li>
      ))}
    </ul>
  );
}