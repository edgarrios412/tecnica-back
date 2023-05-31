const { Router } = require('express');
const bookRoutes = require("./bookRoutes");
const authorRoutes= require("./authorRoutes");
const genreRoutes= require("./genreRoutes");

const router = Router();

router.use("/book", bookRoutes)
router.use("/author", authorRoutes)
router.use("/genre", genreRoutes)

module.exports = router;
