const router = require('express').Router();
const {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    moviebyName,
    getTop5,
    getRecents,
    movieByCategory
} = require('../controllers/movies')
const auth = require('./auth')

router.post('/', auth.required, createMovie)

router.get('/byName/:name', moviebyName)
router.get('/byName', function (req, res) {
    return res.sendStatus(404)
})
router.get('/group/:category', movieByCategory)
// router.get('/group/:title', moviebyName)
router.get('/group', function (req, res) {
    return res.sendStatus(404)
})
router.get('/top5', getTop5)
router.get('/recents', getRecents)
router.get('/:id', getMovie)
router.get('/', getMovie)
router.put('/:id', auth.required, updateMovie)
router.delete('/:id', auth.required, deleteMovie)

module.exports = router;