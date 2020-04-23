function booksController(Book){
  function postBook(req, res){
    if(!req.body.title){
      res.status(400);
      res.send("Title is required");
    }

    const book = new Book(req.body);
 
    book.save();
    res.status(201);
    return res.json(book);
  }

  function getBook(req, res) {
    const query = {};

    if (req.query.genre) { 
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if(err) {
        return res.send(err);
      }

      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });

      return res.json(returnBooks)
    });
  }

  return {postBook, getBook}
}

module.exports = booksController;