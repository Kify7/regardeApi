const router = require('express').Router();
const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    logIn,
    addToFavorites,
    removeFromFavorites
} = require('../controllers/user')
const auth=require('./auth')

router.post('/login', logIn)
router.post('/', createUser)
router.get('/:id', auth.required, getUser)
router.get('/', auth.required, getUser)
router.put('/add-to-favorites/:id', auth.required, addToFavorites)
router.put('/add-to-favorites', function (req, res) {
    return res.sendStatus(404)
})
router.put('/remove-from-favorites/:id', auth.required, removeFromFavorites)
router.put('/remove-from-favorites', function (req, res) {
    return res.sendStatus(404)
})
router.put('/:id', auth.required, updateUser)
router.delete('/:id', auth.required, deleteUser)

module.exports = router;