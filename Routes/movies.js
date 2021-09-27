const router = require('express').Router();
const {
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    moviebyName,
    getTop5,
    getRecents,
    movieByCategory
} = require('../controllers/movies')
const auth = require('./auth')

router.post('/', auth.required, createMovie)
router.get('/byName/:name', moviebyName)
router.get('/byName', function (req, res) {
    return res.sendStatus(404)
})
router.get('/group/:category', movieByCategory)
// router.get('/group/:title', moviebyName)
router.get('/group', function (req, res) {
    return res.sendStatus(404)
})
router.get('/top5', getTop5)
router.get('/recents', getRecents)
router.get('/:id', getMovie)
router.get('/', getMovie)
router.put('/:id', auth.required, updateMovie)
router.delete('/:id', auth.required, deleteMovie)

module.exports = router;

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Movie:
 *              type: object
 *              required:
 *                  - title
 *                  - description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Title of the movie
 *                  genres:
 *                      type: string
 *                      description: An array of all the genres of the movie
 *                  year:
 *                      type: string
 *                      description: Release date of the movie
 *                  directors:
 *                      type: string
 *                      description: An array of all the directors of the movie
 *                  cast:
 *                      type: string
 *                      description: An array of all the main cast of the movie
 *                  poster:
 *                      type: string
 *                      description: An image of the movie
 *                  description:
 *                      type: strng
 *                      descrpton: What the film is about
 *                  rate:
 *                      type: number
 *                      description: How the film is rated around the world
 *                  trailer:
 *                      type: string
 *                      descrption: Link to the trailer or teaser of the movie
 *                  comments:
 *                      type: ongoose.Schema.Types.ObjectId
 *                      description: Comments posted by users
 *                  
 *              example:
 *                  title: Kimi no Na wa
 *                  genres: ["Romance", "Drama", "Supernatural"]
 *                  year: 2016
 *                  directors: ["Shinkai Makoto"]
 *                  cast: ["Kamishiraishi Mone", "Kamiki Ryunosuke", "Hanazawa Kana", "Nagasawa Masami", "Tani Kanon", "Narita Ryou", "Ichihara Etsuko", "Shimazaki Nobunaga", "Yuuki Aoi", "Ishikawa Kaito"]
 *                  poster: https://cdn.myanimelist.net/images/anime/5/87048.jpg
 *                  description: Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the bustling city of Tokyo—a dream that stands in stark contrast to her present life in the countryside.
 *                  rate: 3.9
 *                  trailer: https://www.youtube.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1
 */

/**
 *  @swagger
 *  tags:
 *      name: Movie
 *      description: Movie management API
 */

/**
 *  @swagger
 *  /movies:
 *      post:
 *          tags: [Movie]
 *          summary: Create a new movie
 *          operationId: addMovie
 *          description: An admin can add a new movie to the system
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
 *                        $ref: '#/components/schemas/Movie' 
 *          responses:
 *              200:
 *                  description: Successfully created a new movie
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Movie'
 *              500:
 *                  description: Internal server error
 */

/**
 *  @swagger
 *  /movies/byName/{name}:
 *      get:
 *          tags: [Movie]
 *          summary: Get a movie by name
 *          description: Get a movie by name
 *          parameters:
 *              - in: path
 *                name: Movie name
 *                schema:
 *                  type: string
 *                required: true
 *                description: Movie name
 *          responses:
 *              200:
 *                  description: Successfully retrieved a movie
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          example:
 *                              genres: ["Romance", "Drama", "Supernatural"]
 *                              directors: ["Shinkai Makoto"]
 *                              cast: ["Kamishiraishi Mone", "Kamiki Ryunosuke", "Hanazawa Kana", "Nagasawa Masami", "Tani Kanon", "Narita Ryou", "Ichihara Etsuko", "Shimazaki Nobunaga", "Yuuki Aoi", "Ishikawa Kaito"]
 *                              comments: []
 *                              _id: 614cdb79673f651a745190fc
 *                              title: Kimi no Na wa
 *                              year: 2016
 *                              poster: https://cdn.myanimelist.net/images/anime/5/87048.jpg
 *                              descrption: Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the...
 *                              rate: 3.9
 *                              trailer: https://www.youtube.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1
 *                              createdAt: 2021-09-23T19:54:33.754Z
 *                              updatedAt: 2021-09-25T04:23:49.182Z
 */

/**
 *  @swagger
 *  /movies/group/{category}:
 *      get:
 *          tags: [Movie]
 *          summary: Get a movie by category
 *          description: Get a movie by category
 *          parameters:
 *              - in: path
 *                name: Movie category
 *                schema:
 *                  type: string
 *                required: true
 *                description: Movie category
 *          responses:
 *              200:
 *                  description: Successfully retrieved a movie
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          example:
 *                              genres: ["Romance", "Drama", "Supernatural"]
 *                              directors: ["Shinkai Makoto"]
 *                              cast: ["Kamishiraishi Mone", "Kamiki Ryunosuke", "Hanazawa Kana", "Nagasawa Masami", "Tani Kanon", "Narita Ryou", "Ichihara Etsuko", "Shimazaki Nobunaga", "Yuuki Aoi", "Ishikawa Kaito"]
 *                              comments: []
 *                              _id: 614cdb79673f651a745190fc
 *                              title: Kimi no Na wa
 *                              year: 2016
 *                              poster: https://cdn.myanimelist.net/images/anime/5/87048.jpg
 *                              descrption: Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the...
 *                              rate: 3.9
 *                              trailer: https://www.youtube.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1
 *                              createdAt: 2021-09-23T19:54:33.754Z
 *                              updatedAt: 2021-09-25T04:23:49.182Z
 */

/**
 *  @swagger
 *  /movies/top5:
 *      get:
 *          tags: [Movie]
 *          summary: Top 5 movies
 *          description: Get the top 5 movies
 *          responses:
 *              200:
 *                  description: Successfully retrieved movies
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          example:
 *                              title: Kimi no Na wa
 *                              year: 2016
 */

/**
 *  @swagger
 *  /movies/recents:
 *      get:
 *          tags: [Movie]
 *          summary: Recent movies
 *          description: Get the recent movies
 *          responses:
 *              200:
 *                  description: Successfully retrieved movies
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          example:
 *                              _id: 614cdb79673f651a745190fc
 *                              title: Kimi no Na wa
 *                              year: 2016
 */

/**
 *  @swagger
 *  /movies/{id}:
 *      get:
 *          tags: [Movie]
 *          summary: Get a movie by id
 *          description: Get a movie by id
 *          parameters:
 *              - in: path
 *                name: Movie id
 *                schema:
 *                  type: string
 *                required: true
 *                description: Movie id
 *          responses:
 *              200:
 *                  description: Successfully retrieved a movie
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                          example:
 *                              genres: ["Romance", "Drama", "Supernatural"]
 *                              directors: ["Shinkai Makoto"]
 *                              cast: ["Kamishiraishi Mone", "Kamiki Ryunosuke", "Hanazawa Kana", "Nagasawa Masami", "Tani Kanon", "Narita Ryou", "Ichihara Etsuko", "Shimazaki Nobunaga", "Yuuki Aoi", "Ishikawa Kaito"]
 *                              comments: []
 *                              _id: 614cdb79673f651a745190fc
 *                              title: Kimi no Na wa
 *                              year: 2016
 *                              poster: https://cdn.myanimelist.net/images/anime/5/87048.jpg
 *                              descrption: Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the...
 *                              rate: 3.9
 *                              trailer: https://www.youtube.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1
 *                              createdAt: 2021-09-23T19:54:33.754Z
 *                              updatedAt: 2021-09-25T04:23:49.182Z
 */

/**
 *  @swagger
 *  /movies:
 *      get:
 *          tags: [Movie]
 *          summary: Get all movies
 *          description: Get all movies
 *          responses:
 *              200:
 *                  description: Successfully retrieved all movies
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          example:
 *                              genres: ["Romance", "Drama", "Supernatural"]
 *                              directors: ["Shinkai Makoto"]
 *                              cast: ["Kamishiraishi Mone", "Kamiki Ryunosuke", "Hanazawa Kana", "Nagasawa Masami", "Tani Kanon", "Narita Ryou", "Ichihara Etsuko", "Shimazaki Nobunaga", "Yuuki Aoi", "Ishikawa Kaito"]
 *                              comments: []
 *                              _id: 614cdb79673f651a745190fc
 *                              title: Kimi no Na wa
 *                              year: 2016
 *                              poster: https://cdn.myanimelist.net/images/anime/5/87048.jpg
 *                              descrption: Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the...
 *                              rate: 3.9
 *                              trailer: https://www.youtube.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1
 *                              createdAt: 2021-09-23T19:54:33.754Z
 *                              updatedAt: 2021-09-25T04:23:49.182Z
 */

/**
 *  @swagger
 *  /movies/{id}:
 *      put:
 *          tags: [Movie]
 *          summary: Update a movie
 *          description: An admin can update a movie by his id
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: Movie ID
 *                schema:
 *                  type: string
 *                required: true
 *                description: Movie id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                      example:
 *                          title: Kimi no Na wa 
 *                          genres: ["Romance", "Drama", "Supernatural"] 
 *                          year: 2016
 *                          directors: ["Shinkai Makoto"] 
 *                          cast: ["Kamishiraishi Mone", "Kamiki Ryunosuke", "Hanazawa Kana", "Nagasawa Masami", "Tani Kanon", "Narita Ryou", "Ichihara Etsuko", "Shimazaki Nobunaga", "Yuuki Aoi", "Ishikawa Kaito"] 
 *                          poster: https://cdn.myanimelist.net/images/anime/5/87048.jpg 
 *                          descrption: Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the...
 *                          rate: 3.9
 *                          trailer: https://www.youtube.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1
 *          responses:
 *              200:
 *                  description: Se agregó a la lista de favoritos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                          example:
 *                              _id: 614cdb79673f651a745190fc
 *                              title: Kimi no Na wa 
 *                              genres: ["Romance", "Drama", "Supernatural"] 
 *                              year: 2016
 *                              directors: ["Shinkai Makoto"] 
 *                              cast: ["Kamishiraishi Mone", "Kamiki Ryunosuke", "Hanazawa Kana", "Nagasawa Masami", "Tani Kanon", "Narita Ryou", "Ichihara Etsuko", "Shimazaki Nobunaga", "Yuuki Aoi", "Ishikawa Kaito"] 
 *                              poster: https://cdn.myanimelist.net/images/anime/5/87048.jpg 
 *                              descrption: Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the...
 *                              rate: 3.9
 *                              trailer: https://www.youtube.com/embed/3KR8_igDs1Y?enablejsapi=1&wmode=opaque&autoplay=1
 */

/**
 *  @swagger
 *  /movies/{id}:
 *      delete:
 *          tags: [Movie]
 *          summary: Delete a movie
 *          description: An admin can delete a movie from the system
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json 
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: Movie ID
 *                schema:
 *                  type: string
 *                required: true
 *                description: Movie id
 *          responses:
 *              200:
 *                  description: The movie was deleted.
 *              500:
 *                  description: Internal server error
 */