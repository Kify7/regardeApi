const router = require('express').Router();
const {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    getMovieByCategory
} = require('../controllers/movies')
const auth = require('./auth')

router.post('/', auth.required, createMovie)

router.get('/', getMovie)
router.get('/group/:category', getMovieByCategory)
router.get('/:id', getMovie)


router.put('/:id', auth.required, updateMovie)
router.delete('/:id', auth.required, deleteMovie)

module.exports = router;

