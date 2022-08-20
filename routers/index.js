const Router = require('express');
const authRouter = require('./authRouter');


const router = new Router();


router.use('/user', authRouter);


module.exports = router;
