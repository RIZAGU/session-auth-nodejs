const db = require('../db/postgres')



const createUserProfile = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS user_profile (
        profile_id serial NOT NULL,
        user_id integer,
        email character varying(1000),
        fullname character varying(1000),
        verified_account character varying(1000),
        verified_otp character varying(10),
        status character varying(100),
        join_date date,
        CONSTRAINT pk_profile PRIMARY KEY (profile_id)


    );
    `
    try{
        await db.query(sql)
        console.log("User Profile Table Created")
        return Promise.resolve()
    } catch(error){
        console.log("User Table is Exists")

        return Promise.resolve()
        //return Promise.reject((error))
        //return Promise.resolve()
    }
}



module.exports = {
    createUserProfile
}