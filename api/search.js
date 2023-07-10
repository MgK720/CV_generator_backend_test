
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const searchBySkillLike = async (req, res) =>{
    const {verb_like} = req.query;
    try{
        const result = await pool.query("Select skill_name from skill where skill_name like '%$1%'");
        console.log(result.rows[0]);
        res.send(result.rows[0]);
    }catch(e){
        console.error(e);
    }
}

module.exports = {
    searchBySkillLike,
}