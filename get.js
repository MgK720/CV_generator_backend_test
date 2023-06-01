const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'cvgen_test',
    password: 'password',
    port: 5432,
})

const getCv = async (request, response) => {
    const id = request.params.id;

    try{
        const getPersonalData = await pool.query('SELECT * FROM personaldata WHERE cv_id = $1', [id]);

        const getKnowledgeData = await pool.query('SELECT * FROM knowledge WHERE cv_id = $1', [id]);

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
        console.log(JSON.stringify(outputData.personaldata))
        //console.log(JSON.stringify(outputData));
        response.render('get_cv/get_cv', {
             outputData: JSON.stringify(outputData)
        });

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
