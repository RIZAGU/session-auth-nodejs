const express = require('express')
const router = express.Router()
const controller = require('../controller/routeHandler')
const controllers = require('../controller/auth.controller')
const { verifySignUp } = require("../middleware")
const dataValidatorSanitizer = require('../middleware/dataValidatorSanitizer')

router.get('/cookies',controller.getCookies)

router.get('/cek', controller.getCekCookies)

router.get('/', controller.getHomePage) 

router.get('/login', controller.getLoginPage)
 
router.get('/signup', controller.getSignupPage)

router.get('/product', controller.getProductPage)

router.post('/signup', dataValidatorSanitizer.signup, controller.signupHandler)

router.post('/login', dataValidatorSanitizer.login, controller.loginHandler)

module.exports = router
