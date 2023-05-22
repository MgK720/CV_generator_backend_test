const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'cvgen_test',
    password: 'password',
    port: 5432,
})
const createCv = async (request, response) => {
    let outputMessage = '';
    const cv_url = `http://cv/${Math.floor(Math.random() * 100000)}.cv`
    //personaldata zamienic na object literal
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const email = request.body.myemail;
    const phone_country = request.body.calling_code;
    const phone = request.body.myphone_number;
    let img_destination = `/img/`;
    try{
        const cvID = await addCv(cv_url);
        outputMessage += `Cv added with ID: ${cvID}\n`;

        img_destination += cvID; // do zmiany (rozszerzenie itp)
        const personalDataID = await addPersonalData(cvID, firstname, lastname, email, phone_country, phone, img_destination);
        outputMessage += `PersonalData added with ID: ${personalDataID}\n`;

        console.log(outputMessage);
        response.status(201).send(outputMessage);
    }catch (error){
        console.error(error);
        response.status(500).send("Error while creating CV");
    }

  }
const addCv = async (cv_url) =>{
    const cvResult = await pool.query('INSERT INTO cv(cv_id, create_date, cv_url) VALUES (DEFAULT, DEFAULT, $1) RETURNING *', [cv_url]);
    console.log(`cv_id = ${cvResult.rows[0].cv_id}`)
    return cvResult.rows[0].cv_id;
}

const addPersonalData = async (cvID, firstname, lastname, email, phone_country, phone, img_destination)  =>{
    const personalDataResult = await pool.query('INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [cvID, firstname, lastname, email,phone_country, phone,img_destination]);
    console.log(`personaldata_id = ${personalDataResult.rows[0].personaldata_id}`);
    return personalDataResult.rows[0].personaldata_id;
}

  
module.exports = {
  createCv,
}