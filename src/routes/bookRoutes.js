const { Router } = require("express");
const {
  getBooks,
  getBookById,
  updateBook,
  createBook,
  deleteBook,
} = require("../controllers/bookController");

const bookRoutes = Router();

bookRoutes.get("/all", async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).send(books);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

bookRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findBook = await getBookById(id);
    res.status(200).json(findBook);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

bookRoutes.post("/", async (req, res) => {
  const book = req.body;
  try {
    const newBook = await createBook(book);
    res.status(200).send(newBook);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

bookRoutes.put("/:id", async (req,res) => {
  const {id} = req.params;
  const book = req.body
  try {
    const bookUpdated = await updateBook(id, book)
    res.status(200).send(bookUpdated);
  } catch(error){
    return res.status(404).send({ error: error.message });
  }
})

bookRoutes.delete("/:id", async(req,res) => {
  const {id} = req.params;
  try {
    const bookDeleted = await deleteBook(id)
    res.status(200).send({msg: bookDeleted});
  }catch(error){
    return res.status(404).send({ error: error.message });
  }
})

module.exports = bookRoutes;
