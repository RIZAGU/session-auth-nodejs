const allDAO = require('../dao/all')
const auth = require('../controller/auth.controller')
const db = require('../db/postgres')
const { response } = require('express')

const bcrypt = require('bcrypt')

const signup = async (email, password) => {
    console.log('start signup')
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    console.log('hash')
    try {
        console.log('2')
        //const check = await allDAO.findUser(email)
        //console.log(check)
        //if(check !== null)
        //{
          const user = await allDAO.insertOneUser(email,hash)
          return user
        //} else {
          
          //return Promise.reject('Email registered')
        //} 
        
    
    } catch(err)
    {
        
        console.log('3')
        return Promise.reject(error) 
        //res.json ( {
            //message: 'signup success',
            //data: user
        //})

        //console.log('success')
        //return res.json ( {
        //            message: 'signup failed',
        //            data: check
        //        })
    }
    
               // try {
    //var checks = db.query(text, values, (err, res) => {
                    //for (let row of res.rows) {
                      //  console.log(row);
                    //}
                    //db.end()
    //if(res)
      //  {
        //    console.log('Failed - 1')
         //   return res.json({
          //  'messahe':'failed'
          //  })
        //} else {
        //    console.log('Success - 1')
        //    try {
        //        console.log('Success - 2')
                
              //  return Promise.reject(new Error('Signup failed'))
            //}

        //}
//})
        //} catch(error)
        //{
          //  return Promise.reject(error)
            //console.log('Email registered 1')
            //const user = await allDAO.insertOneUser(email,password)
        //const user = await auth.signup(email,password)
            //return user
        //}
        //}

        //return user
    //} catch (error) {
      //  return Promise.reject(new Error('Signup failed'))
    //}
}

const login = async (email, password) => {
  // 1. validasi email (sudah dilakukan di middleware)
  const error = new Error()
  console.log('1') 
  console.log(error) 

  try {
      // 2. find user
      console.log('2') 
      const user = await allDAO.findUserByEmail(email)
      console.log('3')
      console.log(user.password) 
      const match = await bcrypt.compare(password, user.password)
      if(match){
          return user
      }
      error.status = 400
      error.errors = [
          {
              param: 'password',
              msg: 'email atau password salah'
          }
      ]
      throw error
  } catch (error) {
      return Promise.reject(error)
  }
} 

module.exports = {
    signup,
    login
}

