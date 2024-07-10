import React from 'react';
import BookItem from '../BookItem/index';
import { IBook } from '../../interfaces/IBook';

interface BookListProps {
    books: IBook[];
    searchQuery: string;
    isSearchClicked: boolean;
}

// List with all of the book objects (items) to display
const BookList = ({ books, searchQuery, isSearchClicked }: BookListProps) => {
    return (
        <div className="book-list">
            {books.map(book => (
                <BookItem key={book.id} book={book} searchQuery={searchQuery} isSearchClicked={isSearchClicked} />
            ))}
        </div>
    );
};

export default BookList;
