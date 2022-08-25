
const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../models")
const User = db.sequelize.define("users", {
    
    email: {
      type: DataTypes.STRING
    }
  })



//checkDuplicateEmail = (req, res, next) => {
  //  const email= req.body.email
   // const check = await allDAO.find
    
    //User.findOne({
    //    where: {
    //      email: req.body.email
    //    }
    //  }).then(user => {
    //    if (user) {
    //      res.status(400).send({
    //        message: "Failed! Email is already in use!"
    //      });
        //  return;
    //    }
    //    next();
    //  });
//}

//const verifySignUp = {
  //  checkDuplicateEmail: checkDuplicateEmail
//}


//module.exports = verifySignUp