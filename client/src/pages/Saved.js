import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from '../components/List';

function Saved(props) {
  const [book, setBook] = useState({})

  // When this component mounts, grab the book with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  /* const {id} = useParams() */
  console.log(book);
  useEffect(() => {
    API.getBooks()
      .then(res => setBook(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
      <Container fluid>
        <Col size="sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {book.length ? (
              <List>
                {book.map(book => (
                  <ListItem key={book._id}>
                    <a href={book.link} target="blank">{book.title}</a>
                    <img src={book?.imageLinks?.smallThumbnail} alt={book.title} />
                    <p>Written by: {book.authors}</p>
                    <p>Published on: {book.publishedDate}</p>
                    <p>{book.description}</p>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
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
