import React, { useState } from "react";

function BookForm({ addBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published_at, setPublishedAt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, published_at };
    addBook(newBook);
    setTitle("");
    setAuthor("");
    setPublishedAt("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="date"
        value={published_at}
        onChange={(e) => setPublishedAt(e.target.value)}
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
