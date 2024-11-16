import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch books from API
  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add new book
  const addBook = async (newBook) => {
    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add book");
      }
      
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, data.data]);
      return true;
    } catch (err) {
      console.error("Error adding book:", err);
      return false;
    }
  };

  // Update book
  const updateBook = async (id, updatedBook) => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update book");
      }
      
      const data = await response.json();
      
      if (data.data) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === id ? data.data : book))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating book:", err);
      return false;
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      
      const data = await response.json();
      if (data.message.toLowerCase() === "book deleted successfully") {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error deleting book:", err);
      return false;
    }
  };

  return (
    <div className="App">
      <h1>Book Management</h1>
      {error && <div className="error-message">{error}</div>}
      <BookForm addBook={addBook} />
      <h2>Books List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BookList books={books} updateBook={updateBook} deleteBook={deleteBook} />
      )}
    </div>
  );
}

export default App;