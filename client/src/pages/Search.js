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
    event.preventDefault();
    const query = event.target.value.trim()
    console.log(`>> q`, query)
    API.getGoogleBooks(query).then(res => {
      setGoogleBooks(res.data.items)
      console.log(res.data.items);
    }).catch(err => console.log(err));
    /* const { name, value } = event.target;
    setSaveObject({...saveObject, [name]: value}) */
  };

  function handleSaveButton(id, title, authors, description, image, link) {
    const savedBook = googleBooks.filter(book => book.id === id)
    const savedTitle = googleBooks.filter(book => book.title === title)
    const savedAuthors = googleBooks.filter(book => book.authors === authors)
    const savedDescription = googleBooks.filter(book => book.description === description)
    const savedImage = googleBooks.filter(book => book.image === image)
    const savedLink = googleBooks.filter(book => book.link === link)

    const bookDetails = {
      googleId: id,
      title: savedTitle[0].volumeInfo.title,
      authors: savedAuthors[0].volumeInfo.authors[0],
      description: savedDescription[0].volumeInfo.description,
      image: savedImage[0].volumeInfo.imageLinks.thumbnail,
      link: savedLink[0].volumeInfo.previewLink,
      date: savedBook[0].volumeInfo.publishedDate
    }
    API.saveBook(bookDetails)
    .then(res => {
      setSaveObject(saveObject);
    }).catch(err => console.log(err));
    /* const { name, value } = event.target;
    setSaveObject({...saveObject, [name]: value}) */
    /* if (googleBooks.data.items[0].volumeInfo.title && googleBooks.data.items[0].volumeInfo.authors) { */
      /* API.saveBook({
        googleId: id,
        title: savedBook[0].title,
        author: savedBook[0].authors,
        description: savedBook[0].description,
        image: savedBook[0].image,
        link: savedBook[0].link,
        date: savedBook[0].publishedDate
      })
        .then(res => loadBooks())
        .catch(err => console.log(err)); */
    }
  /* }; */


  /* Bottom Form saves for the  mongod */
  function handleFormSubmit(event) {
    event.preventDefault();
    if (saveObject.title && saveObject.authors) {
      API.saveBook({
        title: saveObject.title,
        authors: saveObject.authors,
        description: saveObject.description
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };
  function handleInputFormChange(event) {
    const { name, value } = event.target;
    setSaveObject({...saveObject, [name]: value})
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
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Search for Book Title"
                        />
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
                                <a href={book.volumeInfo.previewLink} target="blank">{book.volumeInfo.title}</a>
                                <img src={book?.volumeInfo?.imageLinks?.smallThumbnail} alt={book.volumeInfo.title} />
                                <p>Written by: {book.volumeInfo.authors}</p>
                                <p>Published on: {book.volumeInfo.publishedDate}</p>
                                <p>{book.volumeInfo.description}</p>
                                {/* <button className="list-button" onClick={handleSaveButton(book.id)}>Save</button> */}
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
                onChange={handleInputFormChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                onChange={handleInputFormChange}
                name="authors"
                placeholder="Author (required)"
              />
              <Input
                onChange={handleInputFormChange}
                name="description"
                placeholder="Description"
              />
              <Input
                onChange={handleInputFormChange}
                name="link"
                placeholder="Link"
              />
              <FormBtn
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