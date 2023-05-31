const {Router} = require("express")
const {createAuthor, getAuthors, updateAuthor, deleteAuthor} = require("../controllers/authorController")

const authorRoutes = Router()

authorRoutes.get("/", async (req,res) => {
    try {
        const authors = await getAuthors()
        res.status(200).send(authors)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

authorRoutes.put("/:id", async (req,res) => {
    const {id} = req.params
    try {
        const author = await updateAuthor(id)
        res.status(200).send(author)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

authorRoutes.post("/", async (req,res) => {
    const author = req.body
    try {
        const newAuthor = await createAuthor(author)
        res.status(200).send(newAuthor)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

authorRoutes.delete("/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const author = await deleteAuthor(id)
        res.status(200).send(author)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

module.exports = authorRoutes