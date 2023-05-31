const {Router} = require("express")
const {getGenres, updateGenre, createGenre, deleteGenre} = require("../controllers/genreController")

const genreRoutes = Router()

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

genreRoutes.post("/", async (req,res) => {
    const genre = req.body
    try {
        const newGenre = await createGenre(genre)
        res.status(200).send(newGenre)
    } catch (error) {
        return res.status(404).send({error:error.message})
    }
})

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