const db = require('../db/postgres')


const createAllTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS public.users
    (
        user_id serial NOT NULL,
        email character varying(1000),
        password character varying,
        CONSTRAINT pk_user PRIMARY KEY (user_id)
    );

    CREATE TABLE IF NOT EXISTS public.user_activity
    (
        activity_id serial NOT NULL,
        user_id integer,
        status_login character varying(1000),
        date_login date DEFAULT CURRENT_DATE,
        date_logout date,
        CONSTRAINT pk_activity PRIMARY KEY (activity_id)
    );

    CREATE TABLE IF NOT EXISTS public.user_profile
    (
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

    ALTER TABLE IF EXISTS public.user_activity
        ADD CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID;


    ALTER TABLE IF EXISTS public.user_profile
        ADD CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID;
    
    

    

    `

    
    
    try{
        await db.query(sql)


        console.log("User All Table Created")

        return Promise.resolve()
    } catch(error){
        console.log("User All Table is Exists")
        return Promise.resolve()
        //return Promise.reject((error))
        //return Promise.resolve()
    }

}

const findUser = async(email) => {
    console.log('check user email')
    const text = `SELECT * FROM users WHERE email = $1`
    const values = [email]
    console.log(email)
    console.log('try find 1')
    try {
        console.log('try find 2')
        const find = (await db.query(text, values)).rows[0]
        console.log(find)
        return find
    } catch (error)
    {
        //const find = 'clear'
        //return find
        //console.log(error)
        return Promise.reject(error)
    }
}

const insertOneProfileCheck = async(email) => {
    console.log('check user profile')
    const text = `SELECT user_id FROM users WHERE email = $1`
      
    const values = [email]
    console.log('check user profile 2')
    try {
        console.log('try go to insert profile')
        const checks = (await db.query(text, values)).rows[0]
        const check =  parseInt(JSON.stringify(checks).substring(11).slice(0,-1))//parseInt(JSON.stringify(checks).substring(11).substring(0,3))
        console.log(check)
        console.log('go to insert profile')
        const profile = await insertOneProfile(check)
        return profile
    } catch (error)
    {
        console.log(error)
        return Promise.reject(error)
    }
}

const insertOneProfile = async(user_id) => {
    console.log('insert user profile')
    console.log(user_id)
    const getemail = `
            SELECT email FROM users WHERE user_id = $1
            `
    const param = [user_id]
    const emails = (await db.query(getemail, param)).rows[0]
    const emai = JSON.stringify(emails).substring(10).slice(0,-2)
    const email = emai
    console.log(email)
    const quer = `
    INSERT INTO user_profile (user_id,email)
    VALUES ($1,$2)
    RETURNING *
    `
    const para = [user_id,email]

    

    


    console.log('insert user profile 2')
    try {
        console.log('try insert user profile 2')
        console.log(quer)
        console.log(para)
        console.log('try insert user profile 3')
        const profile = await db.query(quer, para)
        
        
        const users = `
            SELECT * FROM users WHERE user_id = $1
            `
        const user = (await db.query(users, param)).rows[0]

        console.log('success insert user profile 2')
        return user
    } catch (error)
    {
        console.log(error)
        return Promise.reject(error)
    }
}

const insertOneUser = async (email, password) => {
    console.log('insert user')
    const text = `
    INSERT INTO users(email, password)
    VALUES ($1, $2)
    RETURNING *
    `
    const values = [email,password]

    try {
        const users = (await db.query(text, values)).rows[0]
        //console.log('DAO: Insert User Success', user)
        const user = await insertOneProfileCheck(email)
        return user
    } catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
}

const findUserByEmail = async (email) => {
    const text = `SELECT * FROM users WHERE email = $1`
    const values = [email]

    try {
        const user = (await db.query(text, values)).rows[0]
        return user
    } catch (error) {
        return Promise.reject('error')
    }
}



module.exports = {
    createAllTable,
    insertOneUser,
    findUserByEmail,
    findUser,
    insertOneProfileCheck,
    insertOneProfile
}