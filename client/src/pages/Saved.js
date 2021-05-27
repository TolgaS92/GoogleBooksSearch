import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import Jumbotron from '../components/Jumbotron';

class Saved extends Component {
    state = {
        savedBooks: [],
    };

    componentDidMount() {
        this.savebook();
    }

    savebook =() => {
        API.getBooks()
        .then(res => this.setState({ books:res.data }))
        .catch(err => console.log(err));
    };

    handleDeleteButton = id => {
        API.deleteBook(id)
        .then(res => this.savebook())
        .catch(err => console.log(err));
    };

    render() {
        return (
            <Container>
                <Jumbotron />
                <Row>
                    <Col size="sm-12">
                        {this.state.savedBooks.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <a href={book.link} target="blank">{book.title}</a>
                                        <img src={book.image} alt={book.title} />
                                        <p>Written by: {book.authors}</p>
                                        <p>Published on: {book.publishedDate}</p>
                                        <p>{book.description}</p>
                                        <button className="list-button" onClick={() => this.handleDeleteButton(book._id)}>Delete</button> 
                                    </ListItem>
                                ))}
                            </List>
                        ) :(
                            <p>Error!</p>
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Saved;