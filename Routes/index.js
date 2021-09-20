var router = require('express').Router();

router.get('/', (req, res) => {
    let html;
    res.send(html = `<h1 style="color:red; text-align:center;">Welcome to Regarde API</h1>`);
});


router.use('/admin', require('./admin'));
router.use('/movies', require('./movies'));
router.use('/comments', require('./comments'));
router.use('/user', require('./user'));

module.exports = router;