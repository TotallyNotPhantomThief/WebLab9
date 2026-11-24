import { useState } from 'react';

export const GENRES = ['fiction', 'non-fiction', 'science', 'history', 'fantasy', 'other'];

const EMPTY = { title: '', author: '', year: '', genre: 'fiction', read: false, rating: '' };

function toForm(book) {
  return {
    title: book.title,
    author: book.author,
    year: String(book.year),
    genre: book.genre,
    read: book.read,
    rating: book.rating === null ? '' : String(book.rating),
  };
}


export default function BookForm({ book, saving, onSave, onCancel }) {
  const [form, setForm] = useState(book ? toForm(book) : EMPTY);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await onSave({
      title: form.title,
      author: form.author,
      year: Number(form.year),
      genre: form.genre,
      read: form.read,
      rating: form.rating === '' ? null : Number(form.rating),
    });
    
    if (ok && !book) setForm(EMPTY);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{book ? 'Edit book' : 'Add a book'}</h2>

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
      <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} />

      <select name="genre" value={form.genre} onChange={handleChange}>
        {GENRES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <label>
        <input name="read" type="checkbox" checked={form.read} onChange={handleChange} />
        Read
      </label>

      <select name="rating" value={form.rating} onChange={handleChange}>
        <option value="">No rating</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : book ? 'Save changes' : 'Add book'}
      </button>
      {book && (
        <button type="button" onClick={onCancel} disabled={saving}>Cancel</button>
      )}
    </form>
  );
}