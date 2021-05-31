import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from '../components/List';
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Saved(props) {
  const [book, setBook] = useState({})

  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBook(res.data)
      )
      .catch(err => console.log(err));
  };
  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  /* const {id} = useParams() */
  console.log(book);
  useEffect(() => {
    API.getBooks()
      .then(res => setBook(res.data))
      .catch(err => console.log(err));
  }, [])
  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
    .then(res => loadBooks())
    .catch(err => console.log(err));  
  }
  return (
    <Container>
    <Col size="sm-12">
        <Jumbotron>
          <h1>Books On My List</h1>
        </Jumbotron>
        {book.length ? (
          <List>
            {book.map(book => (
              <ListItem key={book._id}>
                <a href={book.link} target="blank">{book.title}</a>
                <img src={book.image} alt={book.title} />
                <p>Written by: {book.authors}</p>
                <p>Published on: {book.date}</p>
                <p>{book.description}</p>
                <button onClick={() =>   deleteBook(book._id)}>Delete</button>
              </ListItem>
            ))}
          </List>
        ) : (
          <h3 className="text-center">No Results to Display</h3>
        )}
      </Col>
    <Row>
      <Col size="md-2">
        <Link to="/">← Back to Search</Link>
      </Col>
    </Row>
  </Container>
    );
  }


export default Saved;
