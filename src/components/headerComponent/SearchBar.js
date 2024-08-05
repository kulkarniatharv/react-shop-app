import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    // The actual filtering is done in the App component
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;