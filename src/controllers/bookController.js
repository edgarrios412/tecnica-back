// const axios = require("axios");
// const { Op } = require("sequelize");
const { Book, Genre } = require("../db");

module.exports = {
  getBooks: async () => {
    const books = await Book.findAll({
      include:[{
      model: Genre,
      attributes: ["name"]
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
    return findBook
  },
  // getRecipeByName: async (name) => {
  //   const recipe = await axios.get(
  //     `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=27&apiKey=${process.env.API_KEY}`
  //   );
  //   const recipeAPI = []
  //   recipe.data.results.map(r => {
  //     const obj= {
  //     id:r.id,
  //     title:r.title,
  //     image:r.image,
  //     created: "api",
  //     healthScore: r.healthScore,
  //     diets: r.diets,
  //     }
  //     recipeAPI.push(obj)
  //   })
  //   const recipeDB = await Recipe.findAll({
  //     where:{
  //       title:{[Op.iLike] : `%${name}%` }
  //     }
  //   })
  //   return [...recipeAPI, ...recipeDB];
  // },
  createBook: async (book) => {
    const generos = book.genres.map(g => Number(g.value))
    const idioma = book.lang.label
    const newBook = await Book.create({...book, lang:idioma});
    newBook.addGenres(generos)
    return newBook;
  },
  updateBook: async(id, title) => {
    const findBook = await Book.findOne({where:{
      id:id
    }}) 
    if(findBook){
      findBook.title = title
      const book = await findBook.save()
      return book;
    }
    throw new Error("No hemos conseguido el libro")
  },
  deleteBook: async(id) => {
    const findBook = await Book.findOne({where:{
      id:id
    }}) 
    if(findBook){
      await findBook.destroy()
      return "Eliminado satisfactoriamente";
    }
    throw new Error("No hemos conseguido el libro")
  }
};
