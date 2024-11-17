import React, { useState, useEffect } from 'react';

const BookForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'add' }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        published_at: ''
    });

    useEffect(() => {
        if (initialData && mode === 'edit') {
            setFormData({
                title: initialData.title || '',
                author: initialData.author || '',
                published_at: initialData.published_at || ''
            });
        }
    }, [initialData, mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ title: '', author: '', published_at: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-[500px] relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-6">
                    {mode === 'add' ? 'Add New Book' : 'Edit Book'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Published Date
                        </label>
                        <input
                            type="date"
                            name="published_at"
                            value={formData.published_at}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-500"
                    >
                        {mode === 'add' ? 'Add Book' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookForm;