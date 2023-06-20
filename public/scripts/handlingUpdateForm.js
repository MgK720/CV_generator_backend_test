$(document).ready(function() {
    getPersonalData();
    educationDataFromDbCount = getAllKnowledgeData();
    experienceDataFromDbCount = getAllExperienceData();
    skillDataFromDbCount = getAllSkillData();
    hobbyDataFromDbCount = getAllHobbyData();
    linkDataFromDbCount = getAllLinkData();
 });

function getPersonalData(index = 0){
    let personalData = outputData.personaldata[index];
    $('#personaldata_id').val(personalData.personaldata_id)
    $('input[name="personaldata_id"]').val(personalData.personaldata_id);
    $('#firstname').val(personalData.firstname);

    $('#lastname').val(personalData.lastname);

    getImg($('#myimage'), personalData.img_destination)

    $('#email').val(personalData.email);

    $('#phone_country').val(personalData.phone_country);

    $('#phone').val(personalData.phone);
}

function getKnowledgeData(index){
  let knowledge = outputData.knowledge[index];
    $(`#knowledge_id${index}`).val(knowledge.knowledge_id)
    $(`#knowledge_name${index}`).val(knowledge.knowledge_name)
    $(`#knowledge_type${index}`).val(knowledge.knowledgetype_id)
    $(`#school_type${index}`).val(knowledge.schooltype_id)
    $(`#start_date_knowledge${index}`).val(knowledge.start_date_knowledge.slice(0,10))
    $(`#end_date_knowledge${index}`).val(knowledge.end_date_knowledge.slice(0,10))
    $(`#education_description${index}`).val(knowledge.description)
}

function getExperienceData(index){
  let experience = outputData.experience[index];
  $(`#job_id${index}`).val(experience.job_id)
  $(`#job_name${index}`).val(experience.job_name);
  $(`#start_date_job${index}`).val(experience.start_date_job.slice(0,10));
  $(`#end_date_job${index}`).val(experience.end_date_job.slice(0,10));
}

function getSkillData(index){
  let skill = outputData.skill[index];
  $(`#skill_id${index}`).val(skill.skill_id);
  $(`#skill_name${index}`).val(skill.skill_name);
  $(`#skill_level${index}`).val(skill.level);
};

function getHobbyData(index){
  let hobby = outputData.hobby[index];
  $(`#hobby_id${index}`).val(hobby.hobby_id);
  $(`#hobby_name${index}`).val(hobby.hobby_name);
}

function getLinkData(index){
  let link = outputData.link[index];
  $(`#link_id${index}`).val(link.link_id);
  $(`#link_url${index}`).val(link.link_url);
  $(`#link_name${index}`).val(link.link_name);
}

function getAllKnowledgeData(){
  if(outputData.knowledge){
    getKnowledgeData(0);
    schoolTypeShowOnAdded(0)
    for(let i = 1; i < outputData.knowledge.length; i++){
      const place = document.getElementById("education" + addEducationCount);
      addEducationCount++; 

      createEducationSection(place);

      const newEducationSectionPlace = document.getElementById("education" + addEducationCount);
      prepareEducationSectionForUpdateForm(newEducationSectionPlace);

      getKnowledgeData(i);

      schoolTypeShowOnAdded(i)
    }
  }
  return outputData.knowledge.length;
}


function getAllExperienceData(){
  if(outputData.experience){
    getExperienceData(0);
    for(let i = 1; i < outputData.experience.length; i++){
      const place = document.getElementById('experience' + addExperienceCount);
      addExperienceCount++;

      createExperienceSection(place);
      getExperienceData(i);
    }
  }
  return outputData.knowledge.length;
}

function getAllSkillData(){
  if(outputData.skill){
    getSkillData(0);
    for(let i = 1;i < outputData.skill.length; i++){
      const place = document.getElementById('skill' + addSkillCount)
      addSkillCount++;

      createSkillSection(place);
      getSkillData(i);
    }
  }
  return outputData.skill.length;
}

function getAllHobbyData(){
  if(outputData.hobby){
    getHobbyData(0);
    for(let i = 1; i< outputData.hobby.length; i++){
      const place = document.getElementById('hobby' + addHobbyCount);
      addHobbyCount++;

      createHobbySection(place);
      getHobbyData(i);
    }
  }
  return outputData.hobby.length;
}

function getAllLinkData(){
  if(outputData.link){
    getLinkData(0);
    for(let i = 1; i< outputData.link.length; i++){
      const place = document.getElementById('link' + addLinkCount);
      addLinkCount++;

      createLinkSection(place);
      getLinkData(i);
    }
  }
  return outputData.link.length;
}



function getImg(input, img_destination){
  if(img_destination){
    const file = new File([""], '/' + img_destination);
    input.files = [file];
    console.log(input.files);
  }
}

function prepareEducationSectionForUpdateForm(place){
  const educationIdElement = document.createElement('input');
  setAttributes(educationIdElement, {"type": "number", "name": "knowledge_id" + addEducationCount, "id": "knowledge_id" + addEducationCount, "class": "hidden_id"});
  place.insertBefore(educationIdElement, place.firstChild);
}
