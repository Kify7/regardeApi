const router = require('express').Router();
const {
    createComment,
    getComment,
    updateComment,
    deleteComment,
    commentsbyUsuario,
    commentsofMovie,
    commentsbyUser
} = require('../controllers/comments')
const auth = require('./auth')

router.post('/', auth.required, createComment)
router.get('/:id', getComment)
router.get('/', getComment)
router.get('/byuser/:id', commentsbyUser)
router.get('/ofmovie/:id', commentsofMovie)
router.put('/:id', auth.required, updateComment)
router.delete('/:id', auth.required, deleteComment)

module.exports = router;