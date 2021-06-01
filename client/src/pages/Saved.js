import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
/* import { List, ListItem } from '../components/List'; */
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import SavedResults from "../components/SavedResults";

function Saved(props) {
  const [book, setBook] = useState({})

  useEffect(() => {
    API.getBooks()
      .then(res => setBook(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <Container>
    <Col size="sm-12">
        <Jumbotron>
          <h1>Books On My List</h1>
        </Jumbotron>
        <SavedResults 
        book={book}
        />
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
