import React, { Component } from "react";
import API from "../../utils/API";

class Results extends Component {

    state = {
        savedBooks: [],
    }

    /* createBook = (bookData) => {
        return {
          _id: bookData.id,
          title: bookData.volumeInfo.title,
          authors: bookData.volumeInfo.authors,
          description: bookData.volumeInfo.description,
          image: bookData.volumeInfo.imageLinks.thumbnail,
          link: bookData.volumeInfo.previewLink,
        };
      }; */


    handleSave = book => {  

        if (this.state.savedBooks.map(book => book._id).includes(book._id)) {
            API.deleteBook(book._id)
                .then(deletedBook => this.setState({ savedBooks: this.state.savedBooks.filter(book => book._id !== deletedBook._id) }))
                .catch(err => console.error(err));
        } else {
            API.saveBook(book)
                .then(savedBook => this.setState({ savedBooks: this.state.savedBooks.concat([savedBook]) }))
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div>
                {!this.props.googleBooks.length ? (
                    <h1 className="text-center">No Results to Display</h1>
                ) : (
                        <div>
                            {this.props.googleBooks.map(result => (
                                <div className="card mb-3" key={result.id}>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img alt={result.volumeInfo.title} className="img-fluid" src={result.volumeInfo.imageLinks.thumbnail} />
                                        </div>
                                        <div className="col-md-10">
                                            <div className="card-body">
                                                <h5 className="card-title">{result.volumeInfo.title} by {result.volumeInfo.authors}</h5>
                                                <p className="card-text">{result.volumeInfo.description}</p>
                                                <div>
                                                    <a href={result.volumeInfo.previewLink} className="btn btn-light btn-outline-dark mt-3" target="blank">Details</a>
                                                    <button onClick={() => this.handleSave(result)} className="btn btn-light btn-outline-dark mt-3 ml-3" >
                                                        {this.state.savedBooks.map(book => book._id).includes(result._id) ? "Unsave" : "Save"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        )
    }
}

export default Results;