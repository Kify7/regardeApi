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

/**
 *  @swagger
 *  tags:
 *      name: Comment
 *      description: Comment management API
 */

/**
 *  @swagger
 *  /comments:
 *      post:
 *          tags: [Comment]
 *          summary: Create a new comment
 *          operationId: addComment
 *          description: Any user can add a new comment to a film
 *          security:
 *             - bearerAuth: []
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        type: array
 *                     example:
 *                        movieId: 614cdb79673f651a745190fc
 *                        text: Comentario de prueba
 *          responses:
 *              200:
 *                  description: Successfully created a new comment
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                          example:
 *                              _id: 614ea455917d157118cf7287
 *                              movieId: 614cdb79673f651a745190fc
 *                              text: Comentario de prueba
 *                              userId: 614e1de21478556d787c9694
 *                              createdAt: 2021-09-25T04:23:49.073Z
 *                              updatedAt: 2021-09-25T04:23:49.073Z
 *              500:
 *                  description: Internal server error
 */

/**
 *  @swagger
 *  /comments/byuser/{id}:
 *      get:
 *          tags: [Comment]
 *          summary: Get a Comment by user id
 *          description: Get a Comment by user id
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: User id
 *          responses:
 *              200:
 *                  description: Successfully retrieve comments
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                          example:
 *                              _id: 614ea455917d157118cf7287
 *                              movieId: 614cdb79673f651a745190fc
 *                              text: Comentario de prueba
 *                              userId: 614e1de21478556d787c9694
 *                              createdAt: 2021-09-25T04:23:49.073Z
 *                              updatedAt: 2021-09-25T04:23:49.073Z
 */

/**
 *  @swagger
 *  /comments/ofmovie/{id}:
 *      get:
 *          tags: [Comment]
 *          summary: Get a Comment by movie id
 *          description: Get a Comment by movie id
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Movie id
 *          responses:
 *              200:
 *                  description: Successfully retrieve comments
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                          example:
 *                              _id: 614ea455917d157118cf7287
 *                              movieId: 614cdb79673f651a745190fc
 *                              text: Comentario de prueba
 *                              userId: 614e1de21478556d787c9694
 *                              createdAt: 2021-09-25T04:23:49.073Z
 *                              updatedAt: 2021-09-25T04:23:49.073Z
 */

/**
 *  @swagger
 *  /comments/{id}:
 *      get:
 *          tags: [Comment]
 *          summary: Get a Comment by id
 *          description: Get a Comment by id
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Comment id
 *          responses:
 *              200:
 *                  description: Successfully retrieve a comment
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                          example:
 *                              _id: 614ea455917d157118cf7287
 *                              movieId: 614cdb79673f651a745190fc
 *                              text: Comentario de prueba
 *                              userId: 614e1de21478556d787c9694
 *                              createdAt: 2021-09-25T04:23:49.073Z
 *                              updatedAt: 2021-09-25T04:23:49.073Z
 */

/**
 *  @swagger
 *  /comments:
 *      get:
 *          tags: [Comment]
 *          summary: Get all Comments
 *          description: Get all Comments
 *          responses:
 *              200:
 *                  description: Successfully retrieve all comments
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          example:
 *                              _id: 614ea455917d157118cf7287
 *                              movieId: 614cdb79673f651a745190fc
 *                              text: Comentario de prueba
 *                              userId: 614e1de21478556d787c9694
 *                              createdAt: 2021-09-25T04:23:49.073Z
 *                              updatedAt: 2021-09-25T04:23:49.073Z
 */

/**
 *  @swagger
 *  /comments/{id}:
 *      put:
 *          tags: [Comment]
 *          summary: Update a comment
 *          description: A user can update his comment by his id
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Comment id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                      example:
 *                          movieId: 614cb1a2121d9f4e90982ef9
 *                          text: Comentario de prueba. Más comentario
 *          responses:
 *              200:
 *                  description: Se agregó a la lista de favoritos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                          example:
 *                              id: 614ea455917d157118cf7287
 *                              userId: 614e1de21478556d787c9694
 *                              movieId: 614cb1a2121d9f4e90982ef9
 *                              text: Comentario de prueba. Más comentario
 */

/**
 *  @swagger
 *  /comments/{id}:
 *      delete:
 *          tags: [Comment]
 *          summary: Delete a comment
 *          description: A user can delete a comment from the system by the comment ID
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Comment id
 *          responses:
 *              200:
 *                  description: El comentario se elimino
 *              500:
 *                  description: Internal server error
 */