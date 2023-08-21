const express = require('express');

const router = express.Router();
const userRoutes = require('./userRoutes');
const studentRoutes = require('./studentRoute');
const homeController = require('../controllers/homeController');
const companyRoutes = require('./companyRoute');
const passport = require('passport');

router.get('/', passport.checkAuthentication, homeController.homePage);

//The router. use() function uses the specified middleware function or functions. 
//It basically mounts middleware for the routes which are being served by the specific router.
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/company', companyRoutes);

module.exports = router;
