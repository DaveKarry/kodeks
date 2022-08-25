const Router = require('express');
const musicController = require('../controllers/musicController');
const authHandler = require('../middlware/authHandler');

const router = new Router();


router.post('/v1',authHandler ,musicController.create);
router.get('/v1', musicController.get);
router.put('/v1/:id',authHandler, musicController.update);
router.delete('/v1/:id',authHandler, musicController.delete);

module.exports = router;
