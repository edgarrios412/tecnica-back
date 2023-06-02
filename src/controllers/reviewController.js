const {Review} = require("../db")

module.exports = {
    createReview: async (review) => {
        const newReview = await Review.create(review)
        return newReview;
    },
    getReviews: async (id) => {
        const reviews = await Review.findAll({
            where:{
                bookId:id
            }
        })
        return reviews
    }
}