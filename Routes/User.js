const router = require('express').Router();
// const auth = require('registry-auth-token');
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

router.post('/', createUser)
router.post('/login', logIn)
router.get('/:id', auth.required, getUser)
router.get('/', auth.required, getUser)
router.put('/add-to-favorites/:id', auth.required, addToFavorites)
router.put('/:id', auth.required, updateUser)
router.put('/remove-from-favorites/:id', auth.required, removeFromFavorites)
router.delete('/:id', auth.required, deleteUser)

module.exports = router;