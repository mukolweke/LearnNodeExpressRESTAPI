/* eslint-disable no-param-reassign */
const express = require('express');
const booksController = require('../controllers/booksController')

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books')
    .post(controller.postBook)
    .get(controller.getBook);

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }

      if (book) {
        req.book = book;
        return next();
      }

      return res.sendStatus(404);
    });
  })

  bookRouter.route('/books/:bookId')
    .get((req, res) => {

      const returnBook = req.book.toJSON();

      returnBook.links = {};
      const genre = req.book.genre.replace(' ', '%20');
      returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      returnBook.links.AllBooks = `http://${req.headers.host}/api/books/`;
      res.json(returnBook)
    })
    .put((req, res) => {
      const { book } = req;

      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;

      req.book.save((err) => {
        return err ? res.send(err) : res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;

      if (req.body._id) {
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];

        book[key] = value;
      })

      req.book.save((err) => {
        return err ? res.send(err) : res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        return err ? res.send(err) : res.sendStatus(204);
      })
    });
  return bookRouter;
}


module.exports = routes;