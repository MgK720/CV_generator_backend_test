const bcrypt = require('bcrypt');
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const register = async (request,response)=>{
    try{
        const { login, password, rep_password } = request.body;
        if(password !== rep_password){
            response.render('login_register/register.ejs', {
                msg: 'Repeated password is not the same'
            })
            throw 'Repeated password is not the same';
        }
        const isNewLogin = await isNewUser(login);
        if(isNewLogin){
            let hashedPassword = await bcrypt.hash(password,10);
            try{
                const insertQuery = await pool.query('Insert Into account(account_id, cv_id, login,password) Values (default, null, $1, $2)', [login, hashedPassword]);
            }catch(e){
                throw e;
            }
            console.log(`New account registered - ${login}`);
            response.redirect('/login');
        }else{
            response.render('login_register/register.ejs', {
                msg: 'User with this login already exists'
            })
            throw 'User with this login already exists';
        }
    }catch (error){
        console.log(error);
    }
  }

const isNewUser = async (login) =>{
    try{
        const result = await pool.query('Select login from account where login=$1', [login]);
        if(result.rows.length > 0 ){
            return false;
        }
        return true;
    }catch (error){
        throw error;
    }
}

module.exports = {
    register,
}