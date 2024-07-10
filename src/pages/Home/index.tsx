import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/index";
import BookList from "../../components/BookList/index";
import { Book, mergeData } from "../../helperFunctions/hFuncs";
import { IBook } from "../../interfaces/IBook";

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tempSearchQuery, setTempSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<keyof IBook>("author");
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  // Fetch the data and merge it from the .csv and .json files, then set the initial state
  useEffect(() => {
    const fetchData = async () => {
      const csvFilePath = "/data/books.csv";
      const jsonFilePath = "/data/books.json";
      const mergedData = await mergeData(csvFilePath, jsonFilePath);
      const validBooks = mergedData.filter(book => book.title && book.author && book.genre);
      setBooks(validBooks);
      setFilteredBooks(
        validBooks.sort((a, b) =>
          String(a.author).toLowerCase().localeCompare(String(b.author).toLowerCase())
        )
      );
    };
    fetchData();
  }, []);

  // Update filtered books based on the search query (keyword) and selected sorting option
  useEffect(() => {
    const filtered = books
      .filter((book) =>
        [book.title, book.author, book.genre].some(
          (field) =>
            field && field.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      .sort((a, b) => {
        const fieldA = String(a[sortBy]).toLowerCase();
        const fieldB = String(b[sortBy]).toLowerCase();
        return fieldA.localeCompare(fieldB);
      });
    setFilteredBooks(filtered);
  }, [sortBy, searchQuery, books]);

  // Handle search button press to set search query and trigger filtering
  const handleSearch = () => {
    setIsSearchClicked(true);
    setSearchQuery(tempSearchQuery);
  };

  return (
    <div className="cover-main">
      <div className="bookmark"></div>
      <div className="container">
        <h1>Book Search</h1>
        <SearchBar
          searchQuery={tempSearchQuery}
          setSearchQuery={setTempSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleSearch={handleSearch}
        />
        <div className="header-lines">
          <hr className="header-lines__one" />
          <hr className="header-lines__two" />
        </div>
        <BookList
          books={filteredBooks}
          searchQuery={searchQuery}
          isSearchClicked={isSearchClicked}
        />
        {filteredBooks.length === 0 && (
          <div className="no-results">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
