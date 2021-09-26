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