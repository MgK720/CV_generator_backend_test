$(document).ready(function() {
    getPersonalData();
    educationDataFromDbCount = getAllKnowledgeData();
 });

function getPersonalData(index = 0){
  let personalData = outputData.personaldata[index];
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
    $(`#knowledge_name${index}`).val(knowledge.knowledge_name)
    $(`#knowledge_type${index}`).val(knowledge.knowledgetype_id)
    $(`#school_type${index}`).val(knowledge.schooltype_id)
    $(`#start_date_knowledge${index}`).val(knowledge.start_date_knowledge.slice(0,10))
    $(`#end_date_knowledge${index}`).val(knowledge.end_date_knowledge.slice(0,10))
    $(`#education_description${index}`).val(knowledge.description)
}

function getAllKnowledgeData(){
  if(outputData.knowledge){
    getKnowledgeData(0);
    schoolTypeShowOnAdded(0)
    for(let i = 1; i < outputData.knowledge.length; i++){
      const place = document.getElementById("education" + addEducationCount);
      addEducationCount++;

      createEducationSection(place);
      getKnowledgeData(i);

      schoolTypeShowOnAdded(i)
    }
  }
  return outputData.knowledge.length;
}

function getImg(input, img_destination){
  if(img_destination){
    const file = new File([""], '/' + img_destination);
    input.files = [file];
    console.log(input.files);
  }
}

  