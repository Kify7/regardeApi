const router = require('express').Router();
// const auth = require('registry-auth-token');
const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    logIn,
    addToFavorites
} = require('../controllers/user')
const auth=require('./auth')

router.post('/', createUser)
router.post('/login', logIn)
router.get('/:id', auth.required, getUser)
router.get('/', auth.required, getUser)
router.put('/:id', auth.required, updateUser)
router.delete('/:id', auth.required, deleteUser)
router.post('/add-to-favorites/:id', auth.required, addToFavorites)

module.exports = router;