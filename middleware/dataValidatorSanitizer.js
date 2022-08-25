const { body } = require('express-validator')
const allDAO = require('../dao/all')

const signup = [
    body('email', 'email invalid').exists().isEmail().bail(),
    body('email').custom((value) => {
        return allDAO.findUser(value).then((user) => {
            if(user){
                return Promise.reject(new Error('email sudah terdaftar'))
            }
        })
    }),
    //body('email').default.query('SELECT * FROM users WHERE "user_id" = $1',
    //[body('email')]).then((res) => array_to_maybe_1.default(res.rows)),
    body('password', 'password at least 8 characters').exists().isLength({min: 8, max:26}).trim().matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').matches('[a-z]').withMessage('Password Must Contain an Lowercase Letter').matches('[!@#$%^&*]').withMessage('Password Must Contain an Special Character').trim().escape()
   
    
]

const login = [
    
    body('email', 'email invalid').exists().isEmail().bail(),
    body('email').custom((value) => {
        console.log('validator')
        return allDAO.findUserByEmail(value).then((user) => {
            console.log('validator 2')
            if(typeof user === 'undefined'){
                console.log("REJECTT")
                return Promise.reject(new Error('email not registered'))
            }
            console.log('validator 3')
        })
    }),
    body('password', 'password at least 8 characters').exists().isLength({min: 8, max:26}).trim().matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').matches('[a-z]').withMessage('Password Must Contain an Lowercase Letter').matches('[!@#$%^&*]').withMessage('Password Must Contain an Special Character').trim().escape()
]

module.exports = {
    signup,
    login
}