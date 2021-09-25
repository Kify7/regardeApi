const router = require('express').Router();
// const { route } = require('.');
const {
    createComment,
    getComment,
    updateComment,
    deleteComment,
    commentsofMovie,
    commentsbyUser
} = require('../controllers/comments')
const auth = require('./auth')

router.post('/', auth.required, createComment)
router.get('/byuser/:id', commentsbyUser)
router.get('/byuser', function (req, res) {
    return res.sendStatus(404)
})
router.get('/ofmovie/:id', commentsofMovie)
router.get('/ofmovie', function (req, res) {
    return res.sendStatus(404)
})
router.get('/:id', getComment)
router.get('/', getComment)
router.put('/:id', auth.required, updateComment)
router.delete('/:id', auth.required, deleteComment)

module.exports = router;