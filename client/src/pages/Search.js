import React, { useState, useEffect } from "react";
import API from '../utils/API';
import { Col, Row, Container } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import SearchForm from '../components/SearchForm';
import Results from '../components/Results';

function Search() {
    const [googleBooks, setGoogleBooks] = useState([])

    function makeBook (bookData)  {
        return {
            _id: bookData.id,
            title: bookData.volumeInfo.title,
            authors: bookData.volumeInfo.authors,
            description: bookData.volumeInfo.description,
            image: bookData.volumeInfo.imageLinks.thumbnail,
            link: bookData.volumeInfo.previewLink
        }
    }
    useEffect(() => {
      API.getGoogleBooks("Harry potter").then(res => {
        setGoogleBooks((res.data.items).map(bookData => makeBook(bookData)))
      }).catch(err => console.log(err));
      }, [])
  
  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    event.preventDefault();
    const query = event.target.value.trim()
    API.getGoogleBooks(query).then(res => {
      setGoogleBooks((res.data.items).map(bookData => makeBook(bookData)))
    }).catch(err => console.log(err));
  };
  
  return (
    <Container>
        <Jumbotron>
            <h1>Search for and Save Books of Interest</h1>
        </Jumbotron>
        <Row>
            <Col size="md-12">
                <SearchForm
                handleInputChange={handleInputChange}
                />
            </Col>
        </Row>
        <Row>
            <Col size ="md-12">
              <Results
              googleBooks={googleBooks}
              />
            </Col>
        </Row>
    </Container>

  )
}

export default Search;