import React from 'react';
import { IBook } from '../../interfaces/IBook';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: keyof IBook;
    setSortBy: (sort: keyof IBook) => void;
    handleSearch: () => void;
}

// Component to handle the search bar input and sorting options
const SearchBar = ({ searchQuery, setSearchQuery, sortBy, setSortBy, handleSearch }: SearchBarProps) => {

    // Handle sorting option change automatically
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as keyof IBook);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar__input"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or genre"
            />
            <button className="search-bar__button" onClick={handleSearch}>Search</button>
            <div className="sort-options">
                <label htmlFor="sort-select" className="sort-options__label">Sort by:</label>
                <select className="sort-options__sort-select" id="sort-select" value={sortBy} onChange={handleSortChange}>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                    <option value="genre">Genre</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
