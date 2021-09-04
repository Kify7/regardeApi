const router = require('express').Router();
const {
    createComment,
    getComment,
    updateComment,
    deleteComment
} = require('../controllers/comments')

router.post('/', createComment)
router.get('/', getComment)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router;