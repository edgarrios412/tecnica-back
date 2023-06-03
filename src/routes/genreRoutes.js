const {Router} = require("express")
const {getGenres, updateGenre, createGenre, deleteGenre} = require("../controllers/genreController")

const genreRoutes = Router()


/**
 * @openapi
 * /genre:
 *   get:
 *     summary: Devuelve un array con todos los generos
 *     tags:
 *       - Generos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: array 
 *                   items: 
 *                     type: object
 *                     properties:
 *                      id:
 *                          type: number
 *                      name:
 *                          gender: string
 */

genreRoutes.get("/", async (req,res) => {
    try {
        const genres = await getGenres()
        res.status(200).send(genres)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

genreRoutes.put("/:id", async (req,res) => {
    const {id} = req.params
    try {
        const genre = await updateGenre(id)
        res.status(200).send(genre)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

/**
 * @openapi
 * /genre:
 *   post:
 *     requestBody:
 *       description: Datos del genero a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     summary: Crea un nuevo genero
 *     tags:
 *       - Generos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 */

genreRoutes.post("/", async (req,res) => {
    const genre = req.body
    try {
        const newGenre = await createGenre(genre)
        res.status(200).send(newGenre)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

/**
 * @openapi
 * /genre/{id}:
 *   delete:
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del genero
 *         required: true
 *         schema:
 *           type: number
 *     summary: Elimina un genero por su ID
 *     tags:
 *       - Generos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 */

genreRoutes.delete("/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const genre = await deleteGenre(id)
        res.status(200).send(genre)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

module.exports = genreRoutes