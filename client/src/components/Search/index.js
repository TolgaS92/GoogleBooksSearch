import React from 'react';

function Search () {
    return(
        <div className="container">
            <form className="search">
                <label htmlFor="book">Search for a Book</label>
                <input 
                name="book"
                type="text"
                className="form-control"
                placeholder="Search For a Book"
                id="book"
                />
                <button type="submit" className="search">Search</button>
            </form>
        </div>
    )
}

export default Search;