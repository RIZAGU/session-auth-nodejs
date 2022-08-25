const userService = require('../service/userService')
const { validationResult } = require('express-validator')

const { MemoryStore } = require('express-session')
const sessionStorage = new MemoryStore()

const getCookies = (req,res) => {
    if(req.session.views){
        req.session.views++
        res.send('session increment')
    }else{
        req.session.views = 1
        res.send('welcome to session')
    }
}

const getCekCookies = (req, res) => {
    sessionStorage.all((err,obj) => {
        if(err){
            next(err)
        }
        console.log(obj)
        res.send(obj)
    })
}

const getHomePage = (req, res) => {
    res.render('pages/index')
}

const getLoginPage = (req, res) => {
    res.render('pages/login')
}

const getSignupPage = (req, res) => {
    res.render('pages/signup')
}

const getProductPage = (req, res) => {
    res.render('pages/product')
}

const signupHandler = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const error = validationResult(req)
        if(!error.isEmpty()){
            throw error
        }
        const user = await userService.signup(email,password)
        req.session.user = user
        res.json ( {
            message: 'signup user success',
            data: user
        })

    } catch (error) {
       // next(error)
       res.json({ 
        message: error
    })
       
 
    }

}

const loginHandler = async (req, res, next) => {
    const { email, password } = req.body
    console.log('login handler')
    try {
        const error = validationResult(req)
        console.log(error)
        if(!error.isEmpty()){
            error.status = 400
            throw error
        }
        console.log(error)
        console.log('login handler 2')
        const user = await userService.login(email, password)
        req.session.user = user
        req.session.views++
        res.json({
            message: 'login success',
            data: {
                id: user.user_id
            }
        })
    } catch (error) {
        // res.json({errors : error.array()})       
        res.status(error.status).json(error)
    }
}

module.exports = {
    getCookies,
    getCekCookies,
    getHomePage,
    getLoginPage,
    getSignupPage,
    getProductPage,
    signupHandler,
    loginHandler
}