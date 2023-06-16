const {upload, getFileDetails} = require('./upload_img.js')
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

const updateCv = async (request, response) =>{
    const id = request.params.id;

}

const updatePeronaldata = async ()