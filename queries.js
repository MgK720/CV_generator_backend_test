const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'cvgen_test',
  password: 'password',
  port: 5432,
})


//do wrzucenia w inny plik
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


const createCv = async (request, response) => {
    let addedCvId = 0;
    //const username = req.body.username; //dane z formularza name
    //const password = req.body.password; //dane z formularza name
    //console.log("Username: " + username); //log w konsoli
    //console.log("Password: " + password); //log w konsoli
    //const { name, email } = request.body
    const cv_url = `http://cv/${Math.floor(Math.random() * 100000)}.cv`

    pool.query('INSERT INTO cv(cv_id, create_date, cv_url) VALUES (DEFAULT, DEFAULT, $1) RETURNING *', [cv_url], (error, results) =>{
        if (error){
            throw error
        }
        addedCvId = parseInt(results.rows[0].cv_id);
        console.log(addedCvId);
        //output.push(`Cv added with ID: ${addedCvId}`);
        response.write(`Cv added with ID: ${addedCvId}\n`)
    })
    await sleep(1000);
    console.log(addedCvId);
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const email = request.body.myemail;
    const phone_country = request.body.calling_code;
    const phone = request.body.myphone_number;
    const img_destination = `/img/${addedCvId}`;

    pool.query('INSERT INTO personaldata(personaldata_id, cv_id, firstname, lastname, email, phone_country, phone, img_destination) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING *',
     [addedCvId, firstname, lastname, email,phone_country, phone,img_destination], (error, results) =>{
        if (error){
            throw error
        }
        //output.push(`PersonalData added with ID: ${results.rows[0].personaldata_id}`);
        response.write(`PersonalData added with ID: ${results.rows[0].personaldata_id}\n`)
    })
    await sleep(1000);
    response.status(201).send();

  }

  
module.exports = {
  createCv,
}