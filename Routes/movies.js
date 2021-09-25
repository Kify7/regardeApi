const router = require('express').Router();
const {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    getMovieByCategory,
    getMovieByTitle,
    getTop5,
    getRecents
} = require('../controllers/movies')
const auth = require('./auth')

router.post('/', auth.required, createMovie)

router.get('/', getMovie)
router.get('/top5', getTop5)
router.get('/recents', getRecents)
router.get('/group/:category', getMovieByCategory)
router.get('/group/:title', getMovieByTitle)
router.get('/:id', getMovie)


router.put('/:id', auth.required, updateMovie)
router.delete('/:id', auth.required, deleteMovie)

module.exports = router;

