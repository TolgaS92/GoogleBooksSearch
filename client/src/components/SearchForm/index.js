import React from "react";

function SearchForm(props) {
  return (
    <div className="card mb-3">
      <div className="card-header">Search for a Book Title</div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <input
            onChange={props.handleInputChange}
            name="search"
            type="text"
            className="form-control"
            placeholder="Search by book title"
            id="search"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
