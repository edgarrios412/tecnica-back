const {Router} = require("express")
const {createReview, getReviews} = require("../controllers/reviewController")

const reviewRoutes = Router()


/**
 * @openapi
 * /review/{id}:
 *   get:
 *     summary: Devuelve un array con todos las reviews del libro enviado por ID
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID del libro
 *         required: true
 *         schema:
 *           type: number
 *     tags:
 *       - Reseñas
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

reviewRoutes.get("/:id", async (req,res) => {
    const {id} = req.params
    try {
        const reviews = await getReviews(id)
        res.status(200).send(reviews)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

/**
 * @openapi
 * /review:
 *   post:
 *     requestBody:
 *       description: Datos de la reseña a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               content:
 *                 type: string
 *               rating:
 *                 type: number
 *               bookId:
 *                 type: number
 *     summary: Crea una nueva reseña
 *     tags:
 *       - Reseñas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 */

reviewRoutes.post("/", async (req,res) => {
    const review = req.body
    try {
        const newReview = await createReview(review)
        res.status(200).send(newReview)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

/**
 * @openapi
 * /review/{id}:
 *   delete:
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID de la reseña
 *         required: true
 *         schema:
 *           type: number
 *     summary: Elimina una reseña por su ID
 *     tags:
 *       - Reseñas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 */

module.exports = reviewRoutes