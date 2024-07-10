import React from 'react';
import { IBook } from '../../interfaces/IBook';

interface BookItemProps {
    book: IBook;
    searchQuery: string;
    isSearchClicked: boolean;
}

// Individual book objects (items) from the book list
const BookItem = ({ book, searchQuery, isSearchClicked }: BookItemProps) => {

    // Highlight the matched query (keyword)
    const highlightMatch = (text: string) => {
        const query = searchQuery.toLowerCase();
        if (!query || !isSearchClicked) return text;
        const escapedQuery = escapeRegExp(query);
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        return text.replace(regex, '<span class="book-list__item--highlight">$1</span>');
    };

    // Handle special characters like '\' (backslash)
    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    return (
        <div className="book-list__item">
            <strong>Title:</strong> <span dangerouslySetInnerHTML={{ __html: highlightMatch(book.title) }} />
            <br />
            <strong>Author:</strong> <span dangerouslySetInnerHTML={{ __html: highlightMatch(book.author) }} />
            <br />
            <strong>Genre:</strong> <span dangerouslySetInnerHTML={{ __html: highlightMatch(book.genre) }} />
        </div>
    );
};

export default BookItem;
