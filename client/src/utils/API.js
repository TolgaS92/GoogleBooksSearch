import axios from "axios";

export default {

  // Gets the books from Google
  getGoogleBooks: function (query) {
    console.log("Search", query);
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  },
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    console.log("I am in savebook", bookData);
    return axios.post("/api/books", bookData);
  }
};
