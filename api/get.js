const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const getCv = async (request, response, template) => {
    const id = request.params.id;

    try{
        const getPersonalData = await pool.query('SELECT * FROM personaldata WHERE cv_id = $1', [id]);

        const getKnowledgeData = await pool.query("SELECT cv_id, knowledge_id, knowledge_name, knowledgetype_id,schooltype_id,to_char(start_date_knowledge, 'YYYY-MM-DD'), to_char(end_date_knowledge, 'YYYY-MM-DD'), description FROM knowledge WHERE cv_id = $1 order by knowledge_id", [id]);

        const getExperienceData = await pool.query('SELECT * FROM job WHERE cv_id = $1', [id]);

        const getSkillData = await pool.query('SELECT * FROM skill WHERE cv_id = $1', [id]);

        const getHobbyData = await pool.query('SELECT * FROM hobby WHERE cv_id = $1', [id]);

        const getLinkData = await pool.query('SELECT * FROM link WHERE cv_id = $1', [id]);

        const outputData = {
             personaldata: getPersonalData.rows,
             knowledge: getKnowledgeData.rows,
             experience: getExperienceData.rows,
             skill: getSkillData.rows,
             hobby: getHobbyData.rows,
             link: getLinkData.rows
        };

        console.log(JSON.stringify(outputData));
        //console.log(outputData.knowledge[0].start_date_knowledge)
        //console.log(JSON.stringify(outputData.knowledge));
        if(outputData.personaldata.length){//personaldata is required in all cv's
            response.render(template, {
            outputData: JSON.stringify(outputData)
           });
        }else{
            response.render('confirm_generation/confirm', {
                cvID: -1,
                msg: 'No data available',
            });
        }

        //console.log(outputData);
        //render output or fetch in client side js
        //response.status(200).send(outputData);
    }catch (error){
        console.log(error);
        response.status(500).send("Error while getting data");
    }
}

module.exports = {
    getCv,
}
