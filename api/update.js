const {upload, getFileDetails, deleteFile} = require('./upload_img.js')
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
    outputMessage += await updatePersonaldata(cvID, request.body, request.file);
    outputMessage += await updateAllSkills(cvID, request.body);
    console.log(outputMessage);
    response.send(outputMessage);
  }catch(e){
    console.error(e)
  }
    //if req.body.filename then delete previous img and upload to server new file + change img_destination in db

}
const updatePersonaldata = async(cvID, data, file)=>{
  let output = `cv_id = ${cvID}, personaldata_id = ${data.personaldata_id} updated <br> \n`;
  try{
    let updatePersonaldataQuery = 'Update personaldata set firstname=$2, lastname=$3, email =$4, phone_country=$5, phone=$6 where personaldata_id=$1';
    const newPersonaldataValues = [data.personaldata_id, data.firstname, data.lastname, data.email, data.phone_country, data.phone];
    if(file){
      updatePersonaldataQuery = 'Update personaldata set firstname=$2, lastname=$3, email =$4, phone_country=$5, phone=$6, img_destination=$7 where personaldata_id=$1';
      newimg_destination =`imgs/${file.filename}`;
      newPersonaldataValues.push(newimg_destination);
    }
    const updateResult = await pool.query(updatePersonaldataQuery,newPersonaldataValues)
    if(file){
      const resultDeleteFile = deleteFile(data.img_destination)
      output += resultDeleteFile;
    }
    return output;
  }catch (e){
    console.log(e);
    throw e;
  }

}

const updateOrCreateSkill  = async (cvID, skillID, skill_name, skill_level) =>{
  let typeOfProcess = '';
  let result = ''
  let output = ''

  try{
      if (skillID == -1) {
          typeOfProcess = 'create';
          result = await addSkill(cvID, skill_name, skill_level);
      } else {
          typeOfProcess = 'update';
          result = await updateSkill(skillID, skill_name, skill_level);
      }
      output += `${result}, process = ${typeOfProcess} <br>\n`
      return output
  }catch (e){
      console.log(e);
      throw e;
  }
}
const updateKnowledge = async(knowledge_id, knowledge_name, knowledgetype_id, schooltype_id, start_date_knowledge, end_date_knowledge, description) => {
  try{
      const updateResult = await pool.query(`Update knowledge Set 
      knowledge_name=$2, knowledgetype_id=$3, schooltype_id=$4, start_date_knowledge=$5,end_date_knowledge=$6, description = $7 where knowledge_id=$1`, 
      [knowledge_id, knowledge_name, knowledgetype_id,schooltype_id,start_date_knowledge,end_date_knowledge,description]);
      return `knowledge_id = ${knowledge_id} updated`;
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateExperience = async(job_id, job_name,start_date_job,end_date_job) =>{
  try{
    const updateResult = await pool.query(`Update experience Set
    job_name=$2, start_date_job=$3,end_date_job=$4 where job_id=$1`,
    [job_id,job_name,start_date_job,end_date_job]);
    return `job_id = ${job_id} updated`;
  }catch (e){
    console.log(e);
    throw e;
  }
}
const updateSkill = async (skillID, skill_name, skill_level) => {
  try{
      const updateResult = await pool.query('Update skill Set skill_name= $2, level =$3 where skill_id=$1', [skillID, skill_name, skill_level]);
      return `skill_id = ${skillID} updated`;
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
        numberOfSkill +=1;
        skillNameWithNumber = data['skill_name' + numberOfSkill];
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