const Router = require('express');
const authRouter = require('./authRouter');
const authorRouter = require('./authorRouter');


const router = new Router();


router.use('/user', authRouter);
router.use('/author', authorRouter);


module.exports = router;
