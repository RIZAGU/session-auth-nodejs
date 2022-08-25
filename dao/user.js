const db = require('../db/postgres')

const createUserTable = async () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        user_id serial NOT NULL,
        email character varying(1000),
        password character varying,
        CONSTRAINT pk_user PRIMARY KEY (user_id)
    );
    `

    
    
    try{
        await db.query(sql)


        console.log("User Table Created")

        return Promise.resolve()
    } catch(error){
        console.log("User Table is Exists")

        return Promise.resolve()
        //return Promise.reject((error))
        //return Promise.resolve()
    }

}



module.exports = {
    createUserTable
}