const { Router } = require("express");
const {
  getBooks,
  getBookById,
  updateBook,
  createBook,
  deleteBook,
} = require("../controllers/bookController");

const bookRoutes = Router();


/**
 * @openapi
 * /book/all:
 *   get:
 *     summary: Devuelve un array con todos los libros
 *     tags:
 *       - Libros
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
bookRoutes.get("/all", async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).send(books);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});



/**
 * @openapi
 * /book/{id}:
 *   get:
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del libro
 *         required: true
 *         schema:
 *           type: number
 *     summary: Devuelve un libro por su ID
 *     tags:
 *       - Libros
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object 
 */

bookRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findBook = await getBookById(id);
    res.status(200).json(findBook);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});


/**
 * @openapi
 * /book:
 *   post:
 *     requestBody:
 *       description: Datos del libro a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               created:
 *                 type: string
 *               summary:
 *                 type: string
 *               image:
 *                 type: string
 *               genres:
 *                 type: array 
 *                 items: 
 *                     type: number
 *               lang:
 *                 type: string
 *               date:
 *                 type: string
 *     summary: Crea un nuevo libro
 *     tags:
 *       - Libros
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 */

bookRoutes.post("/", async (req, res) => {
  const book = req.body;
  try {
    const newBook = await createBook(book);
    res.status(200).send(newBook);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});


/**
 * @openapi
 * /book/{id}:
 *   put:
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del libro
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       description: Datos del libro a modificar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *     summary: Modifica un libro por su ID
 *     tags:
 *       - Libros
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 */
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

/**
 * @openapi
 * /book/{id}:
 *   delete:
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del libro
 *         required: true
 *         schema:
 *           type: number
 *     summary: Elimina un libro por su ID
 *     tags:
 *       - Libros
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 */

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
