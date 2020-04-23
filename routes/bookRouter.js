const express = require('express');

function routes(Book) {

  const bookRouter = express.Router();

  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();

      return res.status(201).json(book);
    })
    .get((req, res) => {
      const query = {};

      if (req.query.genre) {
        query.genre = req.query.genre;
      }

      Book.find(query, (err, books) => {
        return err ? res.send(err) : res.json(books)
      });
    });

  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        return err ? res.send(err) : res.json(book);
      });
    });


  return bookRouter;
}


module.exports = routes;