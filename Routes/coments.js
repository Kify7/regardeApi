const router = require('express').Router();
const {
    createComent,
    getComent,
    updateComent,
    deleteComent
} = require('../controllers/coments')

router.post('/', createComent)
router.get('/', getComent)
router.put('/:id', updateComent)
router.delete('/:id', deleteComent)

module.exports = router;