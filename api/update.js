const {upload, getFileDetails} = require('./upload_img.js')
const {addKnowledge, addExperience, addSkill, addHobby, addLink} = require('./create.js');
const Pool = require('pg').Pool
require('dotenv').config({ debug: process.env.DEBUG });
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

//TODO reszta tabel + obsluga plikow, jesli w update frmie dodamy plik (ktory nastepnie dostanie sie na serwer) to aktualizujemy img destination i usuwamy stary plik pod starym img_destination

const updateCv = async (request, response) =>{
  let outputMessage = '';
  let cvID = request.body.cv_id;
  try{
    outputMessage += await updateAllSkills(cvID, request.body);
    console.log(outputMessage);
    response.send(outputMessage);
  }catch(e){
    console.error(e)
  }
    //if req.body.filename then delete previous img and upload to server new file + change img_destination in db

}

const updateOrCreateSkill  = async (cvID, skillID, skill_name, skill_level) =>{
  //let myQuery = 'SELECT skill_id FROM skill WHERE skill_id = $1';
  let typeOfProcess = '';
  let result = ''
  let output = ''

  try{
      //const skillProcesing = await pool.query(myQuery, [skillID]);
      //console.log(skillProcesing.rows.length);
      if (skillID == -1) {
          console.log('cr');
          typeOfProcess = 'create';
          result = await addSkill(cvID, skill_name, skill_level); //cos nie dziala
      } else {
        console.log('up');
          typeOfProcess = 'update';
          result = await updateSkill(skillID, skill_name, skill_level);
      }
      output += `${result}, process = ${typeOfProcess}`
      return output
  }catch (e){
      console.log(e);
      throw e;
  }
}

const updateSkill = async (skillID, skill_name, skill_level) => {
  try{
      let result = ';'
      const updateResult = await pool.query('Update skill Set skill_name= $2, level =$3 where skill_id=$1', [skillID, skill_name, skill_level]);
      //console.log('updateResult === ' + updateResult.length);
      result = `skill_id = ${skillID} updated, ${updateResult.rows[0]}`;
      //console.log(`skill_id = ${skillID} no changes`)
      return result;
  }catch (e){
      console.log(e);
      throw e;
  }
}


const updateAllSkills = async(cvID, data) =>{
  try{
    let output = '';
    let numberOfSkill = 0;
    let skillNameWithNumber = data['skill_name' + numberOfSkill];
    while(skillNameWithNumber){
        let skill_name = data['skill_name' + numberOfSkill];
        let skill_level = data['skill_level' + numberOfSkill];
        let skill_id = data['skill_id' + numberOfSkill];
        if(skill_id){
          output = updateOrCreateSkill(cvID,skill_id, skill_name, skill_level);
        }else{
          output = updateOrCreateSkill(cvID,-1, skill_name, skill_level);
        }
        console.log(`execute updateorCreate for ${numberOfSkill}`);

        numberOfSkill +=1;
        skillNameWithNumber = data['skill_name' + numberOfSkill];
        console.log('num = ' + numberOfSkill);
    }
    if(output){
      return output;
    }else{
      return `cvID = ${cvID} skill data no changes `
    }
  }catch (e){
    console.log(e);
    throw e;
  }
}

module.exports = {
  updateCv,
}