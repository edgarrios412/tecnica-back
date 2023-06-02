const {Router} = require("express")
const {createReview, getReviews} = require("../controllers/reviewController")

const reviewRoutes = Router()

reviewRoutes.get("/:id", async (req,res) => {
    const {id} = req.params
    try {
        const reviews = await getReviews(id)
        res.status(200).send(reviews)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

reviewRoutes.post("/", async (req,res) => {
    const review = req.body
    try {
        const newReview = await createReview(review)
        res.status(200).send(newReview)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

module.exports = reviewRoutes