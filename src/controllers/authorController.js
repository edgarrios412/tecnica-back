const {Author} = require("../db")

module.exports = {
    createAuthor: async (author) => {
        const newAuthor = await Author.create(author)
        return newAuthor;
    },
    getAuthors: async () => {
        const authors = await Author.findAll()
        return authors
    },
    updateAuthor: async(id) => {
        const author = await Author.findOne({where:{
            id:id
        }})
        if(author){
            author.name = "Cambiado"
            const authorUpdated = await author.save()
            return authorUpdated
        }
        throw new Error ("No hemos conseguido el autor con el id " + id)
    },
    deleteAuthor: async(id) => {
        const author = await Author.findOne({where:{
            id:id
        }})
        if(author){
            await author.destroy()
            return "Autor eliminado"
        }
        throw new Error ("No hemos conseguido el autor con el id " + id)
    },
}