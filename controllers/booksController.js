function booksController(Book){
  function postBook(req, res){
    const book = new Book(req.body);

    book.save();

    return res.status(201).json(book);
  }

  function getBook(req, res) {
    const query = {};

    if (req.query.genre) { 
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      return err ? res.send(err) : res.json(books)
    });
  }

  return {postBook, getBook}
}

module.exports = booksController;