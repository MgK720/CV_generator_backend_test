const EDU_LIMIT = 5;
const JOB_LIMIT = 9;
const SKILL_LIMIT = 13;
const HOBBY_LIMIT = 7;
const LINK_LIMIT = 7;

let addEducationCount = 0;
let addExperienceCount = 0;
let addSkillCount = 0;
let addHobbyCount = 0;
let addLinkCount = 0;

//for create form all variables = 0 (1 for education - default 1 section created all time [not removable])
const educationDataFromDbCount = 1; 
const experienceDataFromDbCount = 0;
const skillDataFromDbCount = 0;
const hobbyDataFromDbCount = 0;
const linkDataFromDbCount = 0;
//for update form all variables = tableDataCount
if(checkFormStatus() === 'update'){ //pamietac zeby ustawic ten atrybut w another js file (fetched in update template)
    educationDataFromDbCount = 1; //imported data from another js file (fetched in update template)
    experienceDataFromDbCount = 0;
    skillDataFromDbCount = 0;
    hobbyDataFromDbCount = 0;
    linkDataFromDbCount = 0;
}

function checkFormStatus(){ 
    return document.querySelector('form').getAttribute('formStatus');
}


window.addEventListener("DOMContentLoaded", (event) =>{
    if(checkFormStatus() === 'create'){
        SchoolTypeShowOnRefresh();
        SkillLevelOnRefresh();
        maxDate();
    }
})

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function today(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    let currentDate;
    if(day > 9){currentDate = `${year}-0${month}-${day}`;}
    else{currentDate = `${year}-0${month}-0${day}`;}

    console.log(currentDate);
    return currentDate;

}
function maxDate(){ //tylko dla create form -> poustawiać to w head -> zrobić head dla createForm i updateForm(i tam podane inne pliki .js dla create i dla update)
        const myEduDateInputFrom = document.getElementById("start_date_knowledge0");
        const myEduDateInputTo = document.getElementById("end_date_knowledge0");
        const myExpDateInputFrom = document.getElementById("start_date_job0");
        const myExpDateInputTo = document.getElementById("end_date_job0");


        myEduDateInputFrom.setAttribute("max",today());
        myEduDateInputFrom.setAttribute("value", today());

        myEduDateInputTo.setAttribute("max",today());
        myEduDateInputTo.setAttribute("value", today());

        myExpDateInputFrom.setAttribute("max",today());
        myExpDateInputFrom.setAttribute("value", today());

        myExpDateInputTo.setAttribute("max",today());
        myExpDateInputTo.setAttribute("value", today());

}

$( document ).on( "click", "input[type='date']",function(event){
        var idOfClickedElement = event.target.id;
        if(idOfClickedElement.includes("end_date")){
            return;
        }
        console.log(idOfClickedElement);
        var idEndDate = idOfClickedElement.replace("start", "end");
        console.log("my replaced id = " + idEndDate);
        
        $("input[name='"+ idOfClickedElement + "']").change(function() {
            $("input[name='"+ idEndDate + "']").attr("min",$(this).val());
        })
    })
//input and load
$( document ).on("input","input[type='range']", function(event){
        const idOfClickedElement = event.target.id;
        const valueOfClickedElement = event.target.value;

        const idNumber = idOfClickedElement.charAt(idOfClickedElement.length-1);

        const idOfParagraph = "skill-level-value" + idNumber;

        const idOfParagraphSelector = $("p[id='" + idOfParagraph + "']");

        SkillLevelParagraphSet(valueOfClickedElement, idOfParagraphSelector);

})

function SkillLevelOnRefresh(){
    const skillLevelValue = document.getElementById("skill_level0").value;
    const paragraphSelector = $("p[id='skill-level-value0']");
    SkillLevelParagraphSet(skillLevelValue, paragraphSelector);
    
}

function SkillLevelParagraphSet(skillLevelValue, paragraphSelector){
    if(skillLevelValue == 1){
        paragraphSelector.text("Very Low");
        paragraphSelector.css("color", "#ff0000")
    }else if(skillLevelValue == 2){
        paragraphSelector.text("Low");
        paragraphSelector.css("color", "#ff4d00")
    }else if(skillLevelValue == 3){
        paragraphSelector.text("Medium");
        paragraphSelector.css("color", "#ffa300")
    }else if(skillLevelValue == 4){
        paragraphSelector.text("High");
        paragraphSelector.css("color", "#e3ff00")
    }else if(skillLevelValue == 5){
        paragraphSelector.text("Very High");
        paragraphSelector.css("color", "#a3ff00")
    }else{
        return;
    }
}
/*
--------------------LEGACY-----------------------------
function showLogMsg(message){
        var logElement = document.getElementById("log");
        var logSection = document.getElementById("log-section");
        logElement.textContent = message;
        logSection.style.display = "inline-block";
    
}
window.onload = document.getElementById("remove-log").addEventListener("click", function(){
    var logElement = document.getElementById("log");
    var logSection = document.getElementById("log-section");
    logElement.textContent = "";
    logSection.style.display = "none";
});*/


function schoolTypeShow(addEducationCount) {
    console.log(addEducationCount);
    for(let x = 0; x<=addEducationCount;x+=1){
        const knowledge = document.getElementById("knowledge_type" + x).value;
        if (knowledge == 1) {
            //inline-block
            document.getElementById("school_type" + x).required = true
            document.getElementById("school-type-select" + x).style.display = "flex";
        }
        else{
            document.getElementById("school_type" + x).required = false;
            document.getElementById("school_type" + x).value = "";
            document.getElementById("school-type-select" + x).style.display = "none";
            
    }
}
};

function SchoolTypeShowOnRefresh(){
    //Miałem problem z sessionStorage tego elementu podczas odswiezania strony zostawała wybrana przed refreshem wartość
    //nie działało to prawidłowo z funkcją schoolTypeShow, dlatego teraz po refreshu jesli uzytkownik wybral opcje "school"
    //to prawidłowo wyświetli sie select wyboru school_type
    if(document.getElementById("knowledge_type0").value == 1){
        document.getElementById("school_type0").required = true
        document.getElementById("school-type-select0").style.display = "flex";
    }
}
window.onload = document.querySelector('#myimage').addEventListener('change', validateFile);

function validateFile(){
    console.log('file changed');
    const fileInput = document.querySelector('#myimage');
    let file = fileInput.files[0];

    if(file){
        let fileSize = file.size/1024/1024; //in MB
        let fileExtension = file.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpeg', 'jpg', 'png'];
        if(fileSize < 5 && allowedExtensions.includes(fileExtension)){
            fileInput.setCustomValidity('');
        }else if(fileSize > 5){
            fileInput.setCustomValidity('File size exceeds the maximum limit of 5MB');
        }else if(!allowedExtensions.includes(fileExtension)){
            fileInput.setCustomValidity(`Invalid filetype. Only ${allowedExtensions} files are allowed`);
        }
    }
}

function setAttributes(attrib, values){
    for(let key in values){
        attrib.setAttribute(key,values[key]);
    }
}

function createSpanValidity(){
    const spanValidity = document.createElement("span");
    spanValidity.setAttribute("class","validity");
    return spanValidity;
}


window.onload = document.getElementById("addEducation").addEventListener("click", function() {
    if(addEducationCount == EDU_LIMIT){
        console.log("Too much education records (LIMIT IS " + EDU_LIMIT  + " )");
        //showLogMsg("Too much education records");
        return;
    }
    console.log("You clicked addEducation");
    const place = document.getElementById("education" + addEducationCount);
    addEducationCount = addEducationCount +1;

    const newSection = addEducationSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

});

function addEducationSection(place, data={}){
    const newSection = document.createElement("section");
    newSection.setAttribute("id", "education" + addEducationCount);
    newSection.setAttribute("class", "education added_element");

    console.log("education"+addEducationCount+" added");

    const educationUl = document.createElement("ul");
    const knowledgeLi = document.createElement("li");
    const knowledgeTypeLi = document.createElement("li");
    const knowledgeDateLi = document.createElement("li");
    const knowledgeDescriptionLi = document.createElement("li");


    const knowledgeLabel = document.createElement("label");
    setAttributes(knowledgeLabel, {"for": "knowledge_name" + addEducationCount})
    knowledgeLabel.textContent = "Knowledge:";

    const knowledge = document.createElement("INPUT");
    setAttributes(knowledge, {"type": "text", "name": "knowledge_name" + addEducationCount, "id" : "knowledge_name" + addEducationCount, 
    "class" : "school", "minlength" : "1", "maxlength" : "45"});
    knowledge.required = true;

    const spanValidity0 = createSpanValidity();



    const knowledgeTypeLabel = document.createElement("label");
    setAttributes(knowledgeTypeLabel, {"for": "knowledge_type" + addEducationCount, "class": "knowledge_type"});
    knowledgeTypeLabel.textContent = "Type:";

    const knowledgeType = document.createElement("select");
    setAttributes(knowledgeType, {"name": "knowledge_type" + addEducationCount, "id": "knowledge_type" + addEducationCount, "onchange": "schoolTypeShow(addEducationCount)"});
    knowledgeType.required = true;

    const blankType0 = document.createElement("option");
    setAttributes(blankType0,{"value": ""});
    blankType0.textContent = "--option--";

    const firstKnowledgeType = document.createElement("option");
    setAttributes(firstKnowledgeType,{"value": "1"});
    firstKnowledgeType.textContent = "School";

    const secondKnowledgeType = document.createElement("option");
    setAttributes(secondKnowledgeType,{"value": "0"});
    secondKnowledgeType.textContent = "Course";

    knowledgeType.appendChild(blankType0);
    knowledgeType.appendChild(firstKnowledgeType);
    knowledgeType.appendChild(secondKnowledgeType);

    const spanValidity1 = createSpanValidity();



    const divForSchoolTypeSelect = document.createElement("div");
    setAttributes(divForSchoolTypeSelect, {"id": "school-type-select" + addEducationCount, "class": "school-type-select"});

    /*var schoolTypeLabel = document.createElement("label")
    setAttributes(schoolTypeLabel, {"for": "school-type" + addEducationCount});
    schoolTypeLabel.textContent = "SchoolType:";*/

    const schoolType = document.createElement("select")
    setAttributes(schoolType, {"name": "school_type" + addEducationCount, "id": "school_type" + addEducationCount});
    schoolType.required = true;


    const blankType1 = document.createElement("option");
    setAttributes(blankType1,{"value": ""});
    blankType1.textContent = "--option--";

    const firstSchoolType = document.createElement("option");
    setAttributes(firstSchoolType, {"value": "0"});
    firstSchoolType.textContent = "Primary";

    const secondSchoolType = document.createElement("option");
    setAttributes(secondSchoolType, {"value": "1"});
    secondSchoolType.textContent = "MidSchool";

    const thirdSchoolType = document.createElement("option");
    setAttributes(thirdSchoolType, {"value": "2"});
    thirdSchoolType.textContent = "HighSchool";

    const spanValidity2 = createSpanValidity();

    schoolType.appendChild(blankType1);
    schoolType.appendChild(firstSchoolType);
    schoolType.appendChild(secondSchoolType);
    schoolType.appendChild(thirdSchoolType);

    /*divForSchoolTypeSelect.appendChild(schoolTypeLabel);*/
    divForSchoolTypeSelect.appendChild(schoolType);
    divForSchoolTypeSelect.appendChild(spanValidity2);



    const startYearLabel = document.createElement("label");
    setAttributes(startYearLabel, {"for": "start_date_knowledge" + addEducationCount, class:"startyear"});
    startYearLabel.textContent = "From:";

    const startYear = document.createElement("input");
    setAttributes(startYear, {"type": "date", "name": "start_date_knowledge" + addEducationCount, "id": "start_date_knowledge" + addEducationCount, "min": "1900-01-01", "max": today(), "value": today()});
    startYear.required = true;

    const spanValidity3 = createSpanValidity();

    const endYearLabel = document.createElement("label");
    setAttributes(endYearLabel, {"for": "end_date_knowledge" + addEducationCount,class:"endyear"});
    endYearLabel.textContent = "To:";

    const endYear = document.createElement("input");
    setAttributes(endYear, {"type": "date", "name": "end_date_knowledge" + addEducationCount, "id": "end_date_knowledge" + addEducationCount, "min": "1900-01-01", "max": today(), "value": today()});
    endYear.required = true;

    const spanValidity4 = createSpanValidity();


    const educationDescriptionLabel = document.createElement("label");
    setAttributes(educationDescriptionLabel, {"for": "education_description" + addEducationCount});
    educationDescriptionLabel.textContent = "Description:";

    const educationDescription = document.createElement("input");
    setAttributes(educationDescription, {"type": "text", "name": "education_description" + addEducationCount,"class": "education-description", "id": "education_description" + addEducationCount, "maxlength": "100", "placeholder": "---Write something---"});

    knowledgeLi.appendChild(knowledgeLabel);
    knowledgeLi.appendChild(knowledge);
    knowledgeLi.appendChild(spanValidity0);

    knowledgeTypeLi.appendChild(knowledgeTypeLabel);
    knowledgeTypeLi.appendChild(knowledgeType);
    knowledgeTypeLi.appendChild(spanValidity1);
    knowledgeTypeLi.appendChild(divForSchoolTypeSelect);

    knowledgeDateLi.appendChild(startYearLabel);
    knowledgeDateLi.appendChild(startYear);
    knowledgeDateLi.appendChild(spanValidity3);
    knowledgeDateLi.appendChild(endYearLabel);
    knowledgeDateLi.appendChild(endYear);
    knowledgeDateLi.appendChild(spanValidity4);    

    knowledgeDescriptionLi.appendChild(educationDescriptionLabel);
    knowledgeDescriptionLi.appendChild(educationDescription);


    educationUl.appendChild(knowledgeLi);
    educationUl.appendChild(knowledgeTypeLi);
    educationUl.appendChild(knowledgeDateLi);
    educationUl.appendChild(knowledgeDescriptionLi);
    console.log('datalenght: ', Object.keys(data).length)
    if(!Object.keys(data).length === 0){//if data is not empty object - for update form
        console.log('not empty');
        knowledge.value = data['knowledge'];
        knowledgeType.value = data['knowledge_type'];
        startYear.value = data['start_date_knowledge'];
        endYear.value = data['end_date_knowledge'];
        educationDescription.value = data['description'];    
    }

    newSection.appendChild(educationUl);

    //document.getElementById("myform").appendChild(newSection);
    place.parentNode.insertBefore(newSection, place.nextSibling);

    return newSection;
}


window.onload = document.getElementById("deleteEducation").addEventListener("click", deleteEducationSection);

function deleteEducationSection(){
    console.log("You clicked deleteEducation");
    if(addEducationCount != educationDataFromDbCount-1 ){
        const deleteSection = document.getElementById("education" + addEducationCount);
        const previousSection = addEducationCount-1;
        const scrollSection = document.getElementById("education" + previousSection);
        console.log("education"+addEducationCount+" deleted")
        addEducationCount -=1;
        deleteSection.classList.add("deleted_element");
        const timer = setTimeout(console.log("Timer start"), 1000)
        setTimeout(function(){
           deleteSection.remove();
           scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }, 300);
        setTimeout(()=> {
            clearTimeout();
        }, 1);
    }else{
        console.log("all additional education records deleted");
        const scrollSection = document.getElementById("education-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        //showLogMsg("all additional education records deleted");
    }
}
window.onload = document.getElementById("addjob").addEventListener("click", function() {
    if(addExperienceCount == JOB_LIMIT){
        console.log("Too much experience records (LIMIT IS " + JOB_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addjob");
    let place = document.getElementById("education-buttons");
    if(document.getElementById("experience" + addExperienceCount) == null){
        console.log("my count"+addExperienceCount)
        place = document.getElementById("education-buttons");
    }else{
        place = document.getElementById("experience" + addExperienceCount);
    }
    addExperienceCount = addExperienceCount +1;

    newSection = addExperienceSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
});

function addExperienceSection(place, data={}){
    const newSection = document.createElement("section");
    newSection.setAttribute("id", "experience" + addExperienceCount);
    newSection.setAttribute("class", "experience added_element");

    console.log("experience"+addExperienceCount+" added")

    const experienceUl = document.createElement("ul");
    const jobLi = document.createElement("li");
    const jobDateLi = document.createElement("li");

    const jobLabel = document.createElement("label");
    setAttributes(jobLabel,{"for": "job_name"+addExperienceCount});
    jobLabel.textContent = "Job:";

    const job = document.createElement("input");
    setAttributes(job, {"type": "text", "name": "job_name" + addExperienceCount, "id": "job_name" + addExperienceCount, "minlength": "1", "maxlength": "40"});
    job.required = true;

    const spanValidity0 = createSpanValidity();

    const startYearJobLabel = document.createElement("label");
    setAttributes(startYearJobLabel, {"for": "start_date_job" + addExperienceCount});
    startYearJobLabel.textContent = "From:";

    const startYearJob = document.createElement("input");
    setAttributes(startYearJob, {"type": "date", "name": "start_date_job" + addExperienceCount, "id": "start_date_job" + addExperienceCount, "min": "1900-01-01", "max": today(), "value": today()});
    startYearJob.required = true;

    const spanValidity1 = createSpanValidity();

    const endYearJobLabel = document.createElement("label");
    setAttributes(endYearJobLabel, {"for": "end_date_job" + addExperienceCount});
    endYearJobLabel.textContent = "To:";

    const endYearJob = document.createElement("input");
    setAttributes(endYearJob, {"type": "date", "name": "end_date_job" + addExperienceCount, "id": "end_date_job" + addExperienceCount, "min": "1900-01-01", "max": today(), "value": today()});
    endYearJob.required = true;

    const spanValidity2 = createSpanValidity();

    jobLi.appendChild(jobLabel);
    jobLi.appendChild(job);
    jobLi.appendChild(spanValidity0);

    jobDateLi.appendChild(startYearJobLabel);
    jobDateLi.appendChild(startYearJob);
    jobDateLi.appendChild(spanValidity1);

    jobDateLi.appendChild(endYearJobLabel);
    jobDateLi.appendChild(endYearJob);
    jobDateLi.appendChild(spanValidity2);

    experienceUl.appendChild(jobLi);
    experienceUl.appendChild(jobDateLi);
    if(!Object.keys(data).length === 0){//if data is not empty object - for update form
        console.log('not empty');
        job.value = data['job_name'];
        StartYearJob.value = data['start_date_job'];
        EndYearJob.value = data['end_date_job']; 
    }
    newSection.appendChild(experienceUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);

    return newSection;
}

window.onload = document.getElementById("deletejob").addEventListener("click", deleteExperienceSection);

function deleteExperienceSection(){
    let scrollSection = document.getElementById("experience-buttons");
    console.log("You clicked deleteJob");
        if(addExperienceCount == experienceDataFromDbCount-1){
            scrollSection = document.getElementById("experience-buttons");
            scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
            console.log("all experience records deleted");
            //showLogMsg("all jobs records deleted");
            return;
        }
        const deleteSection = document.getElementById("experience" + addExperienceCount);
        const previousSection = addExperienceCount-1;
        if(previousSection!=experienceDataFromDbCount-1){scrollSection = document.getElementById("experience" + previousSection);}
        else{scrollSection = document.getElementById("experience-buttons");}
        deleteSection.classList.add("deleted_element");
        console.log("experience"+addExperienceCount+" deleted")
        const timer = setTimeout(console.log("Timer start"), 1000)
        setTimeout(function(){
           deleteSection.remove();
           scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }, 300);
        setTimeout(()=> {
            clearTimeout();
        }, 1);
        if(addExperienceCount >= experienceDataFromDbCount ){
            addExperienceCount -=1;
        };
}


window.onload = document.getElementById("addskill").addEventListener("click", function() {
    if(addSkillCount == SKILL_LIMIT){
        console.log("Too much skill records (LIMIT IS " + SKILL_LIMIT + " )");
        //showLogMsg("Too much skill records");
        return;
    }
    console.log("You clicked addskill");
    let place = document.getElementById("experience-buttons");
    if(document.getElementById("skill" + addSkillCount) == null){
        console.log(1);
        place = document.getElementById("experience-buttons");
    }else{
        place = document.getElementById("skill" + addSkillCount);
    }
    addSkillCount = addSkillCount +1;

    const newSection = createSkillSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
});

function createSkillSection(place, data={}){
    const newSection = document.createElement("section");
    newSection.setAttribute("id", "skill" + addSkillCount);
    newSection.setAttribute("class", "skill added_element");

    console.log("skill"+addSkillCount+" added");

    const skillUl = document.createElement("ul");
    const skillNameLi = document.createElement("li");
    const skillLevelli = document.createElement("li");

    const skillNameLabel = document.createElement("label")
    skillNameLabel.setAttribute("for", "skill_name" + addSkillCount);
    skillNameLabel.textContent = "Skill:"

    const skillName = document.createElement("input")
    setAttributes(skillName, {"type": "text", "name": "skill_name" + addSkillCount, "id": "skill_name" + addSkillCount, "minlength": "1", "maxlength": "25"});
    skillName.required = true;

    const spanValidity0 = createSpanValidity();

    const skillLevelLabel = document.createElement("label");
    skillLevelLabel.setAttribute("for", "skill_level" + addSkillCount);

    const skillLevel = document.createElement("input");
    setAttributes(skillLevel, {"type": "range","id": "skill_level" + addSkillCount, "name": "skill_level" + addSkillCount, "min": "1", "max": "5", "value": "3", "step": "1"});

    const skillLevelValue = document.createElement("p");
    skillLevelValue.setAttribute("id", "skill-level-value" + addSkillCount);
    skillLevelValue.textContent = "Medium"

    skillUl.appendChild(skillNameLi);
    skillUl.appendChild(skillLevelli);

    skillNameLi.appendChild(skillNameLabel);
    skillNameLi.appendChild(skillName);
    skillNameLi.appendChild(spanValidity0);

    skillLevelli.appendChild(skillLevelLabel);
    skillLevelli.appendChild(skillLevel);
    skillLevelli.appendChild(skillLevelValue);

    if(!Object.keys(data).length === 0){//if data is not empty object - for update form
        console.log('not empty');
        skillName.value = data['skill_name'];
        skillLevel.value = data['level']; 
    }
    newSection.appendChild(skillUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);

    return newSection;
}
window.onload = document.getElementById("deleteskill").addEventListener("click", deleteSkillSection);

function deleteSkillSection(){
    console.log("You clicked deleteskill");
    let scrollSection = document.getElementById("skill-buttons");
    if(addSkillCount == skillDataFromDbCount-1){
        scrollSection = document.getElementById("skill-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        console.log("all skill records deleted");
        //showLogMsg("all skill records deleted");
        return;
    }
    const deleteSection = document.getElementById("skill" + addSkillCount);
    const previousSection = addSkillCount-1;
    if(previousSection!=skillDataFromDbCount-1){scrollSection = document.getElementById("skill" + previousSection);}
    else{scrollSection = document.getElementById("skill-buttons");}
    deleteSection.classList.add("deleted_element");
    console.log("skill"+addSkillCount+" deleted")
    const timer = setTimeout(console.log("Timer start"), 1000)
    setTimeout(function(){
       deleteSection.remove();
       scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 300);
    setTimeout(()=> {
        clearTimeout();
    }, 1);

    if(addSkillCount >= skillDataFromDbCount ){
        addSkillCount -=1;
    };
}

window.onload = document.getElementById("addhobby").addEventListener("click", function() {
    if(addHobbyCount == HOBBY_LIMIT){
        console.log("Too much hobby records (LIMIT IS " + HOBBY_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addhobby");
    let place = document.getElementById("skill-buttons");
    if(document.getElementById("hobby" + addHobbyCount) == null){
        place = document.getElementById("skill-buttons");
    }else{
        place = document.getElementById("hobby" + addHobbyCount);
    }
    addHobbyCount = addHobbyCount +1;

    const newSection = createHobbySection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });


})

function createHobbySection(place, data={}){
    const newSection = document.createElement("section");
    newSection.setAttribute("id", "hobby" + addHobbyCount);
    newSection.setAttribute("class", "hobby added_element");

    console.log("hobby"+addHobbyCount+" added")

    const hobbyUl = document.createElement("ul");
    const hobbyLi = document.createElement("li");

    const hobbyLabel = document.createElement("label");
    setAttributes(hobbyLabel, {"for": "hobby_name" + addHobbyCount});
    hobbyLabel.textContent = "Hobby:"

    const hobby = document.createElement("input");
    setAttributes(hobby, {"type": "text", "name": "hobby_name" + addHobbyCount, "id": "hobby_name" + addHobbyCount, "minlength": "1", "maxlength": "25"});
    hobby.required = true;

    const spanValidity0 = createSpanValidity();

    hobbyUl.appendChild(hobbyLi);

    hobbyLi.appendChild(hobbyLabel);
    hobbyLi.appendChild(hobby);
    hobbyLi.appendChild(spanValidity0);
    if(!Object.keys(data).length === 0){//if data is not empty object - for update form
        console.log('not empty');
        hobby.value = data['hobby_name'];
    }
    newSection.appendChild(hobbyUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);

    return newSection;
}

window.onload = document.getElementById("deletehobby").addEventListener("click", deleteHobbySection);

function deleteHobbySection(){
    console.log("You clicked deletehobby");
    let scrollSection = document.getElementById("hobby-buttons");
    if(addHobbyCount == hobbyDataFromDbCount-1){
        scrollSection = document.getElementById("hobby-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        console.log("all hobby records deleted");
        //showLogMsg("all hobby records deleted");
        return;
    }

    const deleteSection = document.getElementById("hobby" + addHobbyCount);
    const previousSection = addHobbyCount-1;
    if(previousSection!=hobbyDataFromDbCount-1){scrollSection = document.getElementById("hobby" + previousSection);}
    else{scrollSection = document.getElementById("hobby-buttons");}
    deleteSection.classList.add("deleted_element");
    console.log("hobby"+addHobbyCount+" deleted")
    const timer = setTimeout(console.log("Timer start"), 1000)
    setTimeout(function(){
       deleteSection.remove();
       scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 300);
    setTimeout(()=> {
        clearTimeout();
    }, 1);
    if(addHobbyCount >= hobbyDataFromDbCount ){
        addHobbyCount -=1;
    };
}

window.onload = document.getElementById("addlink").addEventListener("click", function() {
    if(addLinkCount == LINK_LIMIT){
        console.log("Too much link records (LIMIT IS " + LINK_LIMIT + " )");
        //showLogMsg("Too much job records");
        return;
    }
    console.log("You clicked addlink");
    let place = document.getElementById("hobby-buttons");
    if(document.getElementById("link" + addLinkCount) == null){
        place = document.getElementById("hobby-buttons");
    }else{
        place = document.getElementById("link" + addLinkCount);
    }
    addLinkCount = addLinkCount +1;

    const newSection = createLinkSection(place);

    newSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

})

function createLinkSection(place, data={}){
    const newSection = document.createElement("section");
    newSection.setAttribute("id", "link" + addLinkCount);
    newSection.setAttribute("class", "link added_element");

    console.log("link"+addLinkCount+" added")

    const linkUl = document.createElement("ul");
    const linkUrlLi = document.createElement("li");
    const linkNameLi = document.createElement("li");

    const linkUrlLabel = document.createElement("label");
    setAttributes(linkUrlLabel, {"for": "link_url" + addLinkCount});
    linkUrlLabel.textContent = "Link(URL):"

    const linkUrl = document.createElement("input");
    setAttributes(linkUrl, {"type": "text", "name": "link_url" + addLinkCount, "id": "link_url" + addLinkCount, "placeholder": "https://pl.linkedin.com/in/(profile)", "pattern": "https://.*", "maxlength": "100"});
    linkUrl.required = true;

    const spanValidity0 = createSpanValidity();

    const linkNameLabel = document.createElement("label");
    setAttributes(linkNameLabel, {"for": "link_name" + addLinkCount});
    linkNameLabel.textContent = "Display as:"

    const linkName = document.createElement("input");
    setAttributes(linkName, {"type": "text", "name": "link_name" + addLinkCount, "id": "link_name" + addLinkCount, "placeholder": "linkedin",  "minlength": "1"});    
    linkName.required = true;

    const spanValidity1 = createSpanValidity();

    linkUl.appendChild(linkUrlLi);
    linkUl.appendChild(linkNameLi);

    linkUrlLi.appendChild(linkUrlLabel);
    linkUrlLi.appendChild(linkUrl);
    linkUrlLi.appendChild(spanValidity0);

    linkNameLi.appendChild(linkNameLabel);
    linkNameLi.appendChild(linkName);
    linkNameLi.appendChild(spanValidity1);

    if(!Object.keys(data).length === 0){//if data is not empty object - for update form
        console.log('not empty');
        linkUrl.value = data['link_url'];
        linkName.value = data['link_name'];
    }
    newSection.appendChild(linkUl);

    place.parentNode.insertBefore(newSection, place.nextSibling);
    return newSection;
}

window.onload = document.getElementById("deletelink").addEventListener("click", deleteLinkSection);

function deleteLinkSection(){
    console.log("You clicked deletelink");
    let scrollSection = document.getElementById("link-buttons");
    if(addLinkCount == linkDataFromDbCount-1){
        scrollSection = document.getElementById("link-buttons");
        scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        console.log("all link records deleted");
        //showLogMsg("all link records deleted");
        return;
    }

    const deleteSection = document.getElementById("link" + addLinkCount);
    const previousSection = addLinkCount-1;
    if(previousSection!=linkDataFromDbCount-1){scrollSection = document.getElementById("link" + previousSection);}
    else{scrollSection = document.getElementById("link-buttons");}
    deleteSection.classList.add("deleted_element");
    console.log("link"+addLinkCount+" deleted")
    const timer = setTimeout(console.log("Timer start"), 1000)
    setTimeout(function(){
       deleteSection.remove();
       scrollSection.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }, 300);
    setTimeout(()=> {
        clearTimeout();
    }, 1);
    if(addLinkCount >= linkDataFromDbCount ){
        addLinkCount -=1;
    };
}