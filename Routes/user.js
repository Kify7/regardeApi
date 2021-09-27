const router = require('express').Router();
const { createUser, getUser, updateUser, deleteUser, deleteAccount, logIn, addToFavorites, removeFromFavorites } = require('../controllers/user')
const auth = require('./auth')

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
router.delete('/delete-account', auth.required, deleteAccount)
router.delete('/:id', auth.required, deleteUser)

module.exports = router;

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
 *                  - type
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
 *                  type:
 *                      type: string
 *                      description: It can be 'admin' or 'user'
 *              example:
 *                  username: johndoe
 *                  name: John
 *                  lastname: Doe
 *                  email: johndoe@gmail.com
 *                  password: password
 *                  type: user
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
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
 *          tags: [User]
 *          summary: Create a new user
 *          operationId: addUser
 *          description: Add a new user to the system
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
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


/**
 *  @swagger
 *  /user/login:
 *      post:
 *          tags: [User]
 *          summary: Log in a user
 *          operationId: logInUser
 *          description: Log in a user to the system
 *          produces:
 *              - application/json
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *                      example:
 *                          email: johndoe@gmail.com
 *                          password: password
 * 
 *          responses:
 *              200:
 *                  description: Successfully logged in
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                          example:
 *                              email: johndoe@gmail.com
 *                              password: password
 *                              token: dfadsf2asd8a1sd5f1a5sd1f5ads4f5a1sdf
 *              422:
 *                  description: Invalid username or password
 *              500:
 *                  description: Internal server error
 */

/**
 *  @swagger
 *  /user/{id}:
 *      get:
 *          tags: [User]
 *          summary: Get a user by id
 *          description: Get a user by his id
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: Admin ID
 *                schema:
 *                  type: string
 *                required: true
 *                description: Admin ID
 *          responses:
 *              200:
 *                  description: Successfully retrieved a user
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *                          example:
 *                              id: 614e1de21478556d787c9694
 *                              username: johndoe
 *                              name: John
 *                              lastname: Doe
 *                              email: johndoe@gmail.com
 *                              type: user
 *                              favorites: []
 *                              comments: []
 *                              createdAt: 2021-09-24T18:50:10.162Z
 *                              updatedAt: 2021-09-24T18:50:10.162Z
 */

/**
 *  @swagger
 *  /user:
 *      get:
 *          tags: [User]
 *          summary: Get all users
 *          description: Get all users with an administrator account
 *          security:
 *             - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Successfully retrieved all users
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              $ref: '#/components/schemas/User'
 *                          example:
 *                              id: 614e1de21478556d787c9694
 *                              username: johndoe
 *                              name: John
 *                              lastname: Doe
 *                              email: johndoe@gmail.com
 *                              type: user
 *                              favorites: []
 *                              comments: []
 *                              createdAt: 2021-09-24T18:50:10.162Z
 *                              updatedAt: 2021-09-24T18:50:10.162Z
 */

/**
 *  @swagger
 *  /user/add-to-favorites/{id}:
 *      put:
 *          tags: [User]
 *          summary: Save a movie on a favorites list by id
 *          description: Push a movie on a favorites list by id
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: User ID
 *                schema:
 *                  type: string
 *                required: true
 *                description: User id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                      example:
 *                          movie: 614cdb79673f651a745190fc
 *          responses:
 *              200:
 *                  description: Se agregó a la lista de favoritos
 */

/**
 *  @swagger
 *  /user/remove-from-favorites/{id}:
 *      put:
 *          tags: [User]
 *          summary: Remove a film from the list of favorites by id
 *          description: Pull a film from the list of favorites by id
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: User ID
 *                schema:
 *                  type: string
 *                required: true
 *                description: User id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                      example:
 *                          movie: 614cdb79673f651a745190fc
 *          responses:
 *              200:
 *                  description: Se eliminó de la lista de favoritos
 */

/**
 *  @swagger
 *  /user/{id}:
 *      put:
 *          tags: [User]
 *          summary: Update a user
 *          description: Push data to update a user in the system
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: User ID
 *                schema:
 *                  type: string
 *                required: true
 *                description: User id
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

/**
 *  @swagger
 *  /user/delete-account:
 *      delete:
 *          tags: [User]
 *          summary: Delete my user
 *          description: Delete my user from the system
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Usuario eliminado
 *              500:
 *                  description: Internal server error
 */

/**
 *  @swagger
 *  /user/{id}:
 *      delete:
 *          tags: [User]
 *          summary: Delete a user
 *          description: An admin can delete a user from the system
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: User ID
 *                schema:
 *                  type: string
 *                required: true
 *                description: User id
 *          responses:
 *              200:
 *                  description: Usuario eliminado
 *              500:
 *                  description: Internal server error
 */