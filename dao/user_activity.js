const db = require('../db/postgres')



const createUserActivity = async () => {
    const sql = `CREATE TABLE IF NOT EXIST user_activity (
        activity_id serial NOT NULL,
        user_id integer,
        status_login character varying(1000),
        date_login date DEFAULT CURRENT_DATE,
        date_logout date,
        CONSTRAINT pk_activity PRIMARY KEY (activity_id)
    );`
    try{
        await db.query(sql)
        console.log("User Activity Table Created")
        return Promise.resolve()
    } catch(error){
        console.log("User Table is Exists")

        return Promise.resolve()
        //return Promise.reject((error))
        //return Promise.resolve()
    }
}

module.exports = {
    createUserActivity
}