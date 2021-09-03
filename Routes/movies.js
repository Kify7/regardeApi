const router = require('express').Router();
const {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies')

router.post('/', createMovie)
router.get('/', getMovie)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)

module.exports = router;