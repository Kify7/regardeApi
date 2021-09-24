const router = require('express').Router();
const {
    createComment,
    getComment,
    updateComment,
    deleteComment
} = require('../controllers/comments')
const auth=require('./auth')

router.post('/', auth.required, createComment)
router.get('/:id', getComment)
router.get('/', getComment)
router.put('/:id', auth.required, updateComment)
router.delete('/:id', auth.required, deleteComment)

module.exports = router;