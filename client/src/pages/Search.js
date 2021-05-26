import React, { Component } from 'react';
import API from '../utils/API';
import Form from '../components/Form';
import Results from '../components/Results';

class Search extends Component {
    state= {
        books: [],
        search: ""
    }

    componentDidMount() {
        this.bookSearch('little prince');
    }

    createBook = booksResults => {
        return {
            _id: booksResults.id,
            title: booksResults.volumeInfo.title,
            authors: booksResults.volumeInfo.authors,
            description: booksResults.volumeInfo.description,
            image: booksResults.volumeInfo.imageLinks.thumbnail,
            link: booksResults.volumeInfo.previewLink
        }
    }

    bookSearch = query => {
        API.getGoogleBooks(query)
        .then(res => this.setState({ books: res.data.items.map(booksResults => this.createBook(booksResults))}))
        .catch(err => console.error(err))
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.bookSearch(this.state.search);
    }
render () {
    return(
            <div>
                <Form
                    search={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <div className="container">
                    <h2>Results</h2>
                    <Results books={this.state.books} />
                </div>
            </div>
    )
}
}

export default Search;