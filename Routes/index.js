var router = require('express').Router();

router.get('/', (req, res) => {
    let html;
    res.send(html = `<h1 style="color:red; text-align:center;">Welcome to Regarde API</h1>`);
});


router.use('/admin', require('./Admin'));

module.exports = router;