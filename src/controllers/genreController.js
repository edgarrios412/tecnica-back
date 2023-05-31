const {Genre} = require("../db")

module.exports = {
    getGenres: async () => {
        const genres = await Genre.findAll()
        return genres
    },
    updateGenre: async(id) => {
        const genre = await Genre.findOne({where:{
            id:id
        }})
        if(genre){
            genre.name = "Cambiado"
            const genreUpdated = await genre.save()
            return genreUpdated
        }
        throw new Error ("No hemos conseguido el genero con el id " + id)
    },
    deleteGenre: async(id) => {
        const genre = await Genre.findOne({where:{
            id:id
        }})
        if(genre){
            await genre.destroy()
            return "Genero eliminado"
        }
        throw new Error ("No hemos conseguido el genero con el id " + id)
    },
    createGenre: async(genre) => {
        const newGenre = await Genre.create(genre)
        return newGenre
    }
}