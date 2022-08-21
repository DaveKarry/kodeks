const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();

router.post('/v1/registration', userController.registration);
router.post('/v1/login', userController.login);


module.exports = router;
