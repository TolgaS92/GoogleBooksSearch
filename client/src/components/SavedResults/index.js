import React, { Component } from "react";
import API from "../../utils/API";
import { /* Col, */ Row, Container } from "../Grid";
import { List, ListItem } from '../List';

class SavedResults extends Component {
  state = {
    savedBooks: [],
  };

  // load saved books when Saved page renders
  componentDidMount() {
    API.savedBooks()
      .then((savedBooks) => this.setState({ savedBooks: savedBooks }))
      .catch((err) => console.error(err));
  }

  // Function to handle deletion of books
  handleDeleteBook = id => {
    alert("Deleted from the database just need to refresh")
    API.deleteBook(id)
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  };

  render() {
    return (
        <Container>
            <Row>
                {this.props.book.length ? (
                    <List>
                    {this.props.book.map(book => (
                        <ListItem key={book._id}>
                            <a href={book.link} target="blank">{book.title}</a>
                            <img src={book.image} alt={book.title} />
                            <p>Written by: {book.authors}</p>
                            <p>Published on: {book.date}</p>
                            <p>{book.description}</p>
                            <button onClick={() =>   this.handleDeleteBook(book._id)}>Delete</button>
                            </ListItem>
                        ))}
                        </List>
                    ) : (
                        <h3 className="text-center">No Results to Display</h3>
                )}
            </Row>
        </Container>
    );
    }
}

export default SavedResults;