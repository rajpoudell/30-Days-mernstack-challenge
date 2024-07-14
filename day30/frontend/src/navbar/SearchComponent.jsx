import React, { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto mt-5">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="p-2 mb-4 w-full border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
                Search
            </button>
        </div>
    );
};

export default SearchComponent;
