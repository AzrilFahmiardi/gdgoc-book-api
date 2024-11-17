import React, { useEffect, useState } from "react";
import BookGrid from "./components/BookGrid";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import axios from "axios";

const url = import.meta.env.VITE_APP_URL || 'http://localhost:8000';

function App() {
  const [latestBook, setLatestBook] = useState({})
  const [oldesttBook, setOldestBook] = useState({})
  const [authorCount, setAuthorCount] = useState(0)
  const [bookCount, setBookCount] = useState(0)
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const getBookStat = async () => {
    try {
      const response = await axios.get(`${url}/api/books/stats`);
      setLatestBook(response.data.statistics.latest_book)
      setOldestBook(response.data.statistics.oldest_book)
      setBookCount(response.data.statistics.total_books)
      setAuthorCount(response.data.statistics.total_authors)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching books statistics: ", err)
    }
  }

  const handleSearch = async () => {
    if (!searchTitle && !searchAuthor) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`${url}/api/books/search`, {
        params: {
          title: searchTitle,
          author: searchAuthor
        }
      });
      setSearchResults(response.data.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSearchResults([]);
      }
      console.error("Error searching books: ", err);
    }
  };

  const handleAddBook = async (formData) => {
    try {
        await axios.post(`${url}/api/books`, formData);
        getBookStat();
        setIsModalOpen(false);
        if (isSearching) {
            handleSearch();
        }
    } catch (err) {
        console.error("Error adding book:", err);
        alert("Failed to add book");
    }
};

  const handleEditBook = async (formData) => {
      try {
          await axios.put(`${url}/api/books/${editingBook.id}`, formData);
          getBookStat();
          setEditingBook(null);
          if (isSearching) {
              handleSearch();
          }
      } catch (err) {
          console.error("Error updating book:", err);
          alert("Failed to update book");
      }
  };

  const handleDeleteBook = async (bookId) => {
      try {
          await axios.delete(`${url}/api/books/${bookId}`);
          getBookStat();
          if (isSearching) {
              handleSearch();
          }
      } catch (err) {
          console.error("Error deleting book:", err);
          alert("Failed to delete book");
      }
  };

  useEffect(() => {
    getBookStat();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTitle, searchAuthor]);

  return (
    <>
      <h1 className="m-5 font-bold font-poppins text-[1.5em] mb-5">WELCOME TO AZRIL BOOKS DATABASE</h1>

      <div className="w-fit h-auto border-2  m-5  px-7 py-5 space-y-5 rounded-lg">
        <div className="flex justify-start gap-10">
          <div className="flex flex-col w-auto h-auto font-poppins gap-3">
            <p className="font-bold">Latest Book</p>
            {loading ? (
              Array(1).fill(null).map((_, index) => (
                <BookCard key={`loading-${index}`} />
              ))
            ) : (
              <BookCard key={latestBook.id} book={latestBook} />
            )}
          </div>
          <div className="flex flex-col w-auto h-auto font-poppins gap-3">
            <p className="font-bold">Oldest Book</p>
            {loading ? (
              Array(1).fill(null).map((_, index) => (
                <BookCard key={`loading-${index}`} />
              ))
            ) : (
              <BookCard key={oldesttBook.id} book={oldesttBook} />
            )}
          </div>
          <div className="ml-5 mt-3 font-poppins">
            <h2 className="font-bold mb-3">Database Information</h2>
            <p>Number of books : {bookCount}</p>
            <p>Number of authors : {authorCount}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-auto px-8 py-5 space-y-5">
        <p className="font-bold text-[2em] font-poppins">ALL BOOKS</p>
        <div className="flex justify-start gap-5 font-poppins text-[0.9em]">
            <input 
                type="text" 
                placeholder="search by title" 
                className="border-2 border-gray-500 px-3 py-1 rounded-md"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="search by author" 
                className="border-2 border-gray-500 px-3 py-1 rounded-md"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
            />
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 px-5 py-1 rounded-md font-bold text-white hover:bg-green-500"
            >
                ADD BOOK
            </button>
        </div>
        <BookGrid 
            isSearching={isSearching} 
            searchResults={searchResults}
            onEdit={setEditingBook}
            onDelete={handleDeleteBook}
        />
      </div>

    <BookForm 
        isOpen={isModalOpen || !!editingBook}
        onClose={() => {
            setIsModalOpen(false);
            setEditingBook(null);
        }}
        onSubmit={editingBook ? handleEditBook : handleAddBook}
        initialData={editingBook}
        mode={editingBook ? 'edit' : 'add'}
    />
</>
    );
}

export default App;