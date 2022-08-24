const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();


/**
 * Регистрация пользователя
 * @route POST /user/v1/registration
 * @group autorisation - Operations about user
 * @param {string} User.body.required - {\"login\": \"dd@mail.ru\",\"password\": \"test\"}
 * @returns {object} 200 - токен
 * @returns {Error}  400 - Пустые поля / Пользователь с такой почтой зарегистрирован / Ошибка валидации
 */
router.post('/v1/registration', userController.registration);


/**
 * Логин пользователя
 * @route POST /user/v1/login
 * @group autorisation - Operations about user
 * @param {string} User.body.required - {\"login\": \"dd@mail.ru\",\"password\": \"test\"}
 * @returns {object} 200 - токен
 * @returns {Error}  404 - Нет пользователя с такой почтой
 * @returns {Error}  400 - Пароль неверный
 */
router.post('/v1/login', userController.login);


module.exports = router;
