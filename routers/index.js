const Router = require('express');
const authRouter = require('./authRouter');
const authorRouter = require('./authorRouter');


const router = new Router();

/**
 * @typedef User
 * @property {string} login.required - Login
 * @property {string} password.required - Password
 */
router.use('/user', authRouter);
router.use('/author', authorRouter);


module.exports = router;
