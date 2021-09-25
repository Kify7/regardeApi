const router = require('express').Router();
const { createUser, getUser, updateUser, deleteUser, logIn, addToFavorites, removeFromFavorites } = require('../controllers/user')
const auth=require('./auth')

/**
 *  @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - username
 *                  - name
 *                  - lastname
 *                  - email
 *                  - password
 *              properties:
 *                  username:
 *                      type: string
 *                      description: Username of the user
 *                  name:
 *                      type: string
 *                      description: Name of the user
 *                  lastname:
 *                      type: string
 *                      description: Lastname of the user
 *                  email:
 *                      type: string
 *                      description: Email of the user
 *                  password:
 *                      type: string
 *                      description: Password of the user
 *              example:
 *                  username: johndoe
 *                  name: John
 *                  lastname: Doe
 *                  email: johndoe@gmail.com
 *                  password: password
 *          securitySchemes:
 *              bearerAuth:
 *                  type: http
 *                  scheme: bearer
 *                  bearerFormat: JWT
 */

/**
 *  @swagger
 *  tags:
 *      name: User
 *      description: User management API
 */

/**
 *  @swagger
 *  /user:
 *      post:
 *          summary: Create a new user
 *          tags: [User]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/User' 
 *          responses:
 *              200:
 *                  description: Successfully created a new user
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              500:
 *                  description: Internal server error
 */

router.post('/login', logIn)
router.post('/', createUser)

/**
 *  @swagger
 *  /user/login:
 *      post:
 *          summary: Login a user
 *          tags: [User]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: Successfully logged in
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              422:
 *                  description: Invalid username or password
 *              500:
 *                  description: Internal server error
 */

router.post('/login', logIn)

/**
 *  @swagger
 *  /user/{id}:
 *      get:
 *          summary: Get a user
 *          tags: [User]
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Get a user by id
 *          responses:
 *              200:
 *                  description: Successfully retrieved a user
 *                  
 *                      
 */

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