import React from "react";
import editLogo from '../assets/edit.png'
import deleteLogo from '../assets/delete.png'

const BookCard = ({ book, onEdit, onDelete }) => {
    if (!book) {
        return (
            <div className="w-[300px] h-[150px] border-2 border-[#000000b2] rounded-md px-4 py-2 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        );
    }

    const handleEdit = () => {
        onEdit(book);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
            onDelete(book.id);
        }
    };

    return (
        <div className="relative w-[300px] h-[150px] border-2 border-[#000000b2] rounded-md px-4 py-2 font-poppins hover:bg-gray-500/20">
            <p className="font-bold text-[1.2em] mb-3">{book.title}</p>
            <p className="font-extralight">{book.author}</p>
            <p className="font-extralight">{book.published_at}</p>
            <div className="absolute flex justify-end bottom-4 right-3 gap-3">
                <button onClick={handleEdit}>
                    <img src={editLogo} alt="edit" className="w-8 hover:scale-125 transition-transform duration-200 rounded-md" />
                </button>
                <button onClick={handleDelete}>
                    <img src={deleteLogo} alt="delete" className="w-8 hover:scale-125 transition-transform duration-200 rounded-md"/>
                </button>
            </div>
        </div>
    );
};

export default BookCard;