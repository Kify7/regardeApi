const router = require('express').Router();
const {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies')

router.post('/', createMovie)

//Estas dos líneas de código las dejamos, las otras las modificamos para ADMIN y USER
router.get('/:id', getMovie)
router.get('/', getMovie)

router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)

module.exports = router;