const Router = require('express');
const AuthorController = require('../controllers/authorController');
const authHandler = require('../middlware/authHandler');


const router = new Router();


/**
 * Регистрация пользователя
 * @route POST /author/v1
 * @group author - Зарегистрировать автора
 * @param {string} User.body.required - {\"name\": \"Metallika\"}
 * @returns {object} 200 - новая запись
 * @returns {Error}  400 - Пустые поля / Уже существует музыкант / Ошибка валидации
 */
router.post('/v1',authHandler, AuthorController.create);
/**
 * плучить автора по id
 * @route GET /author/v1
 * @group author - Получение автора по id
 * @param {string} User.body.required - {\"name\": \"Metallika\"}
 * @returns {object} 200 - новая запись
 * @returns {Error}  400 - Пустые поля / Уже существует музыкант / Ошибка валидации
 */
router.get('/v1/:id',authHandler, AuthorController.getOne);

router.get('/v1',authHandler, AuthorController.getAll);

router.put('/v1',authHandler, AuthorController.update);
router.delete('/v1',authHandler, AuthorController.delete);


module.exports = router;