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
      return err ? res.send(err) : res.json(books)
    });
  }

  return {postBook, getBook}
}

module.exports = booksController;