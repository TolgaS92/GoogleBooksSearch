import React, { useState, useEffect } from "react";
import API from '../utils/API';
import { Input, FormBtn } from '../components/Form';
import { Link } from "react-router-dom";
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import Jumbotron from '../components/Jumbotron';
import Wrapper from '../components/Wrapper';

function Search() {
    const [books, setBooks] = useState([])
    const [saveObject, setSaveObject] = useState({})
    const [googleBooks, setGoogleBooks] = useState([])

    useEffect(() => {
        loadBooks()
      }, [])
    
    function getGoogleBooks(event) {
        event.preventDefault();
        API.getGoogleBooks("Harry Potter").then(googleBooks => {
            setGoogleBooks(googleBooks.data.items);
            console.log(googleBooks.data.items);
        })
    };
    function loadBooks() {
        API.getBooks()
        .then(res => 
        setBooks(res.data)
        )
        .catch(err => console.log(err));
    };
    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
        .then(res => loadBooks())
        .catch(err => console.log(err));
  }
  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setSaveObject({...saveObject, [name]: value})
  };

  function handleFormSubmit() {
    if (saveObject.title && saveObject.authors) {
      API.saveBook({
        title: saveObject.title,
        authors: saveObject.authors,
        description: saveObject.description,
        image: saveObject.image,
        link: saveObject.link
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };
  return (
    <Container>
        <Jumbotron>
            <h1>Search for and Save Books of Interest</h1>
        </Jumbotron>
        <Row>
            <Col size="md-12">
                <Wrapper>
                    <form>
                        <p>Search for a Title:</p>
                        <Input
                        defaultValue="Harry Potter"
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Search for Book Title"
                        />
                        <FormBtn onClick={getGoogleBooks}>
                            Search
                        </FormBtn>
                    </form>
                </Wrapper>
            </Col>
        </Row>
        <Row>
            <Col size="sm-12">
                {googleBooks.length ? (
                    <List>                            
                        {googleBooks.map(book => (
                            <ListItem key={book.id}>
                                <a href={book.volumeInfo.link} target="blank">{book.volumeInfo.title}</a>
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                                <p>Written by: {book.volumeInfo.authors}</p>
                                <p>Published on: {book.volumeInfo.publishedDate}</p>
                                <p>{book.volumeInfo.description}</p>
                                <button className="list-button" onClick={handleFormSubmit}>Save</button>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <p>Error</p>
                )}
            </Col>
        </Row>
        <Row>
        <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handleInputChange}
                name="authors"
                placeholder="Author (required)"
              />
              <Input
                onChange={handleInputChange}
                name="description"
                placeholder="Description"
              />
              <Input
                onChange={handleInputChange}
                name="image"
                placeholder="Image"
              />
              <Input
                onChange={handleInputChange}
                name="link"
                placeholder="Link"
              />
              <FormBtn
                disabled={!(saveObject.authors && saveObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
        <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                    </Link>
                    <button onClick={() => deleteBook(book._id)}>Delete</button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
    </Container>

  )
}

export default Search;