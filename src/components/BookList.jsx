import React, { useState } from "react";

function BookList({ books, updateBook, deleteBook }) {
  const [editingBook, setEditingBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_at, setPublishedAt] = useState("");
  const [error, setError] = useState("");

  const handleEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPublishedAt(book.published_at);
    setError("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const success = await updateBook(editingBook.id, { 
        title, 
        author, 
        published_at 
      });
      
      if (success) {
        setEditingBook(null);
      } else {
        setError("Failed to update book. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while updating the book.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
      } catch (err) {
        setError("An error occurred while deleting the book.");
      }
    }
  };

  return (
    <div className="book-list">
      {error && <div className="error-message">{error}</div>}
      
      {editingBook && (
        <form onSubmit={handleUpdate} className="edit-form">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="published_at">Publication Date:</label>
            <input
              id="published_at"
              type="date"
              value={published_at}
              onChange={(e) => setPublishedAt(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingBook(null)}>Cancel</button>
          </div>
        </form>
      )}
      
      <ul className="books-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-info">
              <strong>{book.title}</strong>
              <span>by {book.author}</span>
              <span>({book.published_at})</span>
            </div>
            <div className="book-actions">
              <button onClick={() => handleEdit(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;