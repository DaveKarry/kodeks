const Router = require('express');
const AuthorController = require('../controllers/authorController');
const router = new Router();

router.post('/v1', AuthorController.create);
router.get('/v1', AuthorController.get);
router.get('/v1/:id', AuthorController.getOne);
router.put('/v1', AuthorController.update);
router.delete('/v1', AuthorController.delete);


module.exports = router;