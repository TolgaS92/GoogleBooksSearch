import React, { Component } from 'react';
import API from '../utils/API';
import { Input, FormBtn } from '../components/Form';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import Jumbotron from '../components/Jumbotron';
import Wrapper from '../components/Wrapper';

class Search extends Component {
    state= {
        books: [],
        title: "",
        error: "Error!"
    }


    createBook = (data) => {

        let objBooks = { books: [] };
    
        for (let i = 0; i < data.length; i++) {
          if (data[i].volumeInfo.imageLinks) {
            let item = {
              id: data[i].id,
              title: data[i].volumeInfo.title,
              authors: data[i].volumeInfo.authors,
              publishedDate: data[i].volumeInfo.publishedDate,
              description: data[i].volumeInfo.description,
              image: data[i].volumeInfo.imageLinks.thumbnail,
              link: data[i].volumeInfo.previewLink,
            }
            objBooks.books.push(item)
          }
        }
        this.setState({ books: objBooks.books, title: ""})
      };

    /* bookSearch = query => {
        API.getGoogleBooks(query)
        .then(res => this.setState({ books: res.data.items.map(booksResults => this.createBook(booksResults))}))
        .catch(err => console.error(err))
    }; */

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
            if (this.state.title) {
                API.getGoogleBooks(this.state.title)
                .then(res => {
                this.createBook(res.data.items);
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                    errorMessage: "Couldn't find any books related to your query!"
                });
            });
            }
    }

    handleSaveBooks = id => {
        
    }

render () {
    return(
        <Container>
            <Jumbotron />
            <Row>
                <Col size="sm-12">
                    <Wrapper>
                        <form>
                            <p>Search for a Title:</p>
                            <Input
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            name="title"
                            placeholde="Search for a Book"
                            />
                            <FormBtn onClick={this.handleFormSubmit}>
                                Search
                            </FormBtn>
                        </form>
                    </Wrapper>
                </Col>
            </Row>
            <Row>
                <Col size="sm-12">
                    {this.state.books.length ? (
                        <List>                            
                            {this.state.books.map(book => (
                                <ListItem key={book.id}>
                                    <a href={book.link} target="blank">{book.title}</a>
                                    <img src={book.image} alt={book.title} />
                                    <p>Written by: {book.authors}</p>
                                    <p>Published on: {book.publishedDate}</p>
                                    <p>{book.description}</p>
                                    <button className="list-button" onClick={() => this.handleSaveBooks(book.id)}>Save</button>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <p>{this.state.error}</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
}

export default Search;