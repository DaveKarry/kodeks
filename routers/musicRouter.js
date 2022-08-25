const Router = require('express');
const musicController = require('../controllers/musicController');
const router = new Router();


router.post('/v1',musicController.create);
router.get('/v1/:id',musicController.getOne);
router.get('/v1',musicController.get);
router.put('/v1',musicController.update);
router.delete('/v1',musicController.delete);

module.exports = router;
