import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const url = import.meta.env.VITE_APP_URL || 'http://localhost:8000';

const BookGrid = ({ isSearching, searchResults, onEdit, onDelete }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllbooks = async () => {
        try {
            const response = await axios.get(`${url}/api/books`);
            setBooks(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching books: ", err)
        }
    }

    useEffect(() => {
        if (!isSearching) {
            getAllbooks();
        }
    }, [isSearching]);

    const displayBooks = isSearching ? searchResults : books;

    return (
        <div className="flex justify-start flex-wrap gap-8">
            {loading ? (
                Array(books.length).fill(null).map((_, index) => (
                    <BookCard key={`loading-${index}`} />
                ))
            ) : displayBooks.length === 0 ? (
                <div className="w-full text-center font-poppins text-gray-500">
                    {isSearching ? "No books found matching your search" : "No books available"}
                </div>
            ) : (
                displayBooks.map((book) => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
}

export default BookGrid;