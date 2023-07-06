const bcrypt = require('bcrypt');

require('dotenv').config({ debug: process.env.DEBUG });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const register = async (request,response)=>{
    const { login, password, rep_password } = req.body;
    if(password !== rep_password){
        response.render('login_register/register.ejs', {
            msg: 'Repeated password is not the same'
        })
    }
    const isNewLogin = isNewUser(login);
    if(isNewLogin){

    }else{
        response.render('login_register/register.ejs', {
            msg: 'User with this login already exists'
        })
    }

  }

const isNewUser = async (login) =>{
    const result = await pool.query('Select login from account where login=$1', [login]);
    if(result.length > 0 ){
        return false;
    }
    return true;
}