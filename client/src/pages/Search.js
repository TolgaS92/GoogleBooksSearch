import React, { useState, useEffect } from "react";
import API from '../utils/API';
import { Input, FormBtn } from '../components/Form';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import Jumbotron from '../components/Jumbotron';
import Wrapper from '../components/Wrapper';

function Search() {
    const [saveObject, setSaveObject] = useState({})
    const [googleBooks, setGoogleBooks] = useState([])

    useEffect(() => {
      API.getGoogleBooks("Harry potter").then(res => {
        setGoogleBooks(res.data.items)
        console.log(res.data.items);
      }).catch(err => console.log(err));
      }, [])
  
  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    event.preventDefault();
    const query = event.target.value.trim()
    console.log(`>> q`, query)
    API.getGoogleBooks(query).then(res => {
      setGoogleBooks(res.data.items)
      console.log(res.data.items);
    }).catch(err => console.log(err));
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
    .then(res =>  {
      setSaveObject(saveObject);
    }).catch(err => console.log(err));
  }


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
        <Row className="mt-3">
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
                                <FormBtn
                                className="list-button"
                                onClick={() =>   handleSaveButton(book.id)}
                                >
                                  Save
                                </FormBtn>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                  <h3 className="text-center mt-5">No Results to Display Yet!</h3>
                )}
            </Col>
        </Row>
    </Container>

  )
}

export default Search;