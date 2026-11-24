import { useEffect, useState } from 'react';
import { getBooks, getStats, createBook, replaceBook, updateBook, deleteBook } from './api/books.js';
import Filters from './components/Filters.jsx';
import BookList from './components/BookList.jsx';
import BookForm from './components/BookForm.jsx';
import Stats from './components/Stats.jsx';

export default function App() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({ q: '', genre: '', read: '', sort: '', order: 'asc' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); 

  
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    getBooks(filters, controller.signal)
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; 
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [filters, refreshKey]);


  useEffect(() => {
    const controller = new AbortController();

    getStats(controller.signal)
      .then(setStats)
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setStats(null);
      });

    return () => controller.abort();
  }, [refreshKey]);

 
  async function runAction(action) {
    setBusy(true);
    setActionError('');
    try {
      await action();
      setRefreshKey((k) => k + 1);
      return true;
    } catch (err) {
      setActionError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleSave(data) {
    const ok = await runAction(() =>
      editing ? replaceBook(editing.id, data) : createBook(data)
    );
    if (ok) setEditing(null);
    return ok;
  }

  function handleToggleRead(book) {

    const changes = book.read ? { read: false, rating: null } : { read: true };
    runAction(() => updateBook(book.id, changes));
  }

  function handleRate(book, value) {
    runAction(() => updateBook(book.id, { rating: value === '' ? null : Number(value) }));
  }

  async function handleDelete(book) {
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    const ok = await runAction(() => deleteBook(book.id));
    if (ok && editing?.id === book.id) setEditing(null);
  }

  return (
    <div>
      <h1>Reading List</h1>

      <Stats stats={stats} />

      <BookForm
        key={editing ? editing.id : 'new'}
        book={editing}
        saving={busy}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      {actionError && <p role="alert">Error: {actionError}</p>}

      <Filters filters={filters} onChange={setFilters} />

      <BookList
        books={books}
        loading={loading}
        error={error}
        busy={busy}
        onToggleRead={handleToggleRead}
        onRate={handleRate}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
}