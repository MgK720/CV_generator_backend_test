const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const deleteCv = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const result = await pool.query('Delete from cv where cv_id = $1', [id]);
        console.log(`${id} - deleted: ${result}`);
        response.render('confirm_generation/confirm', {
                cvID: id,
                msg: 'successfully deleted',
                errorUpdate: false,
                errorDelete: false
        });
    } catch (error) {
        console.log(error);
        response.render('confirm_generation/confirm', {
            cvID: id,
            msg: 'Something gone wrong',
            errorUpdate: false,
            errorDelete: true
    });
    }
}

module.exports = {
    deleteCv
}