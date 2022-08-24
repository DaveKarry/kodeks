const Router = require('express');
const AuthorController = require('../controllers/authorController');
const router = new Router();

/**
 * Регистрация пользователя
 * @route POST /author/v1
 * @group author - Зарегистрировать автора
 * @param {string} User.body.required - {\"name\": \"Metallika\"}
 * @returns {object} 200 - новая запись
 * @returns {Error}  400 - Пустые поля / Уже существует музыкант / Ошибка валидации
 */
router.post('/v1', AuthorController.create);
/**
 * плучить автора по id
 * @route GET /author/v1
 * @group author - Получение автора по id
 * @param {string} User.body.required - {\"name\": \"Metallika\"}
 * @returns {object} 200 - новая запись
 * @returns {Error}  400 - Пустые поля / Уже существует музыкант / Ошибка валидации
 */
router.get('/v1', AuthorController.get);
router.get('/v1/:id', AuthorController.getOne);
router.put('/v1', AuthorController.update);
router.delete('/v1', AuthorController.delete);


module.exports = router;