// const axios = require("axios");
// const { Op } = require("sequelize");
const { Book, Genre, Review } = require("../db");

module.exports = {
  getBooks: async () => {
    await Genre.findOrCreate({
      where: { id: 1 },
      defaults: { name: 'Accion' }
    });
    await Genre.findOrCreate({
      where: { id: 2 },
      defaults: { name: 'Comedia' }
    });
    await Genre.findOrCreate({
      where: { id: 3 },
      defaults: { name: 'Romance' }
    });
    await Genre.findOrCreate({
      where: { id: 4 },
      defaults: { name: 'Adultos' }
    });
    const books = await Book.findAll({
      include:[{
      model: Genre,
      attributes: ["name"]
    },{
      model:Review
    }]
  })
    return books
  },
  getBookById: async (id) => {
    const findBook = await Book.findOne({
      where:{
        id: id
      },
      include:[{
        model: Genre,
        attributes: ["name"]
      }]
    })
    if(!findBook) throw new Error("El libro con el ID "+ id+ " no existe")
    return findBook
  },
  createBook: async (book) => {
    const generos = book.genres.map(g => Number(g.value))
    const idioma = book.lang.label
    const newBook = await Book.create({...book, lang:idioma});
    newBook.addGenres(generos)
    return newBook;
  },
  updateBook: async(id, book) => {
    const findBook = await Book.findOne({where:{
      id:id
    }}) 
    if(findBook){
      if(book.title) findBook.title = book.title
      if(book.image) findBook.image = book.image
      if(book.summary) findBook.summary = book.summary
      if(book.created) findBook.created = book.created
      if(book.lang) findBook.lang = book.lang
      await findBook.save()
      return "Se ha actualizado el libro";
    }
    throw new Error("No hemos conseguido el libro")
  },
  deleteBook: async(id) => {
    const findBook = await Book.findOne({where:{
      id:id
    }}) 
    if(findBook){
      await findBook.destroy()
      return "Se ha eliminado el libro";
    }
    throw new Error("No hemos conseguido el libro")
  }
};
