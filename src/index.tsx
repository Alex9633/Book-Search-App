import React from 'react';
import ReactDOM from 'react-dom';
import './pages/Home/style.css';
import './components/BookItem/style.css';
import './components/BookList/style.css';
import './components/SearchBar/style.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

