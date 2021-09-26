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

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Comment:
 *              type: object
 *              required:
 *                  - userId
 *                  - movieId
 *                  - text
 *              properties:
 *                  userId:
 *                      type: mongoose.Schema.Types.ObjectId
 *                      description: Id of user
 *                  movieId:
 *                      type: mongoose.Schema.Types.ObjectId
 *                      description: Id of the movie
 *                  text:
 *                      type: string
 *                      description: A user review of the film
 *                  
 *              example:
 *                  userId: 614d6038d64b451be091c6bb
 *                  movieId: 614cdb79673f651a745190fc
 *                  text: Great movie. I love it ♥
 */