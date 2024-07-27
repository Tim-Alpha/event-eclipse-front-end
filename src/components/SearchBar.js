import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchResults, setQuery } from '../slices/searchSlice';
import './SearchBar.css';

const SearchBar = () => {
  const [typingTimeout, setTypingTimeout] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const query = e.target.value;
    dispatch(setQuery(query));

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      dispatch(fetchResults({ query, page: 1 }));
    }, 2000));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search for venues..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
