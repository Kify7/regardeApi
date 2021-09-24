const router = require('express').Router();
const {
    createAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    logIn,
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/admin')
const auth = require('./auth')
const prefix = '/:adminId'

router.post('/', createAdmin)
router.post('/login', logIn)
router.post(prefix + '/', auth.required, createMovie)
router.get(prefix + '/movies/:id', getMovie)
router.get(prefix + '/movies/', getMovie)
router.get(prefix + '/:id', auth.required, getAdmin)
router.get(prefix + '/', auth.required, getAdmin)
router.put(prefix + '/update-movie/:id', auth.required, updateMovie)
router.put(prefix + '/:id', auth.required, updateAdmin)
router.delete(prefix + '/delete-movie/:id', auth.required, deleteMovie)
router.delete(prefix + '/:id', auth.required, deleteAdmin)

module.exports = router;