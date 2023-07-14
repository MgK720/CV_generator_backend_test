
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
    const pageSize = 6; // pages per site

    const verb_like = req.query.verb_like;
    let pageNumber = req.query.pageNumber || 1;
    const offset = (pageNumber - 1) * pageSize;
    // const query = `SELECT cv.cv_id, MIN(personaldata.img_destination) AS img_destination, MIN(personaldata.firstname) AS firstname, MIN(personaldata.lastname) AS lastname,
    //                         MIN(personaldata.phone_country) AS phone_country, MIN(personaldata.phone) AS phone, MIN(personaldata.email) AS email,
    //                         STRING_AGG(skill.skill_name, ',') AS skills
    //                     FROM cv
    //                         INNER JOIN personaldata ON cv.cv_id = personaldata.cv_id
    //                         INNER JOIN skill ON cv.cv_id = skill.cv_id
    //                         WHERE skill.skill_name ILIKE $1
    //                         GROUP BY cv.cv_id;`;

const query = `SELECT DISTINCT cv_id, img_destination, firstname, lastname, phone_country, phone, email, skills 
                     FROM (SELECT skill.cv_id, skill.skill_name, personaldata.firstname, personaldata.lastname, 
                          personaldata.phone_country, personaldata.phone,personaldata.email, 
                          personaldata.img_destination, (SELECT STRING_AGG(skill_name, ',') FROM skill where cv_id = cv.cv_id) AS skills
                              FROM  ((cv INNER join skill 
                              ON cv.cv_id=skill.cv_id
                              ) INNER JOIN personaldata 
                              ON cv.cv_id=personaldata.cv_id) WHERE skill.skill_name ILIKE $1) as response LIMIT $2 OFFSET $3`;
    try{
        const result = await pool.query(query, [`%${verb_like}%`,pageSize, offset]);
        const outputData = result.rows;
        for(let i =0; i < outputData.length; i++){
            outputData[i].skills = outputData[i].skills.split(',');
        }
        //console.log(result.rows);
        console.log(`Talent Finder Request, Verb = ${verb_like}`);
        res.send(result.rows);
    }catch(e){
        console.error(e);
    }
}

module.exports = {
    searchBySkillLike,
}