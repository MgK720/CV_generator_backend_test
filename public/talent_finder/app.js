//TODO W PRZYSZLOSCI OGRANICZENIE WYSWIETLANIA DANYCH NP TYLKO PO 20 NA STRONE I PRZYCISK NEXT 
let pageNumber = 1;
let searchTerm = 0;

const form = document.querySelector('form');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    pageNumber = 1;
    searchTerm = form.elements.verb_like.value;

    deleteCards();
    await fetchData(searchTerm, pageNumber);

    form.elements.verb_like.value = '';
})
previous.addEventListener('click', async ()=> {
    if(pageNumber > 1){
        deleteCards();
        pageNumber--;
        await fetchData(searchTerm, pageNumber);
    }
})
next.addEventListener('click', async ()=>{
    deleteCards();
    pageNumber++;
    await fetchData(searchTerm, pageNumber);
})


const makeCards = (data) => {
    for (let row of data) {
        makeCard(row);    
    }
}

const fetchData = async (verb, page)=>{
    try{
        const config = { params: { verb_like: verb, pageNumber: page} }
        const res = await axios.get(`/talentfinder/search`, config);
        makeCards(res.data);
    }catch(e){
        console.log(e);
    }
}

const makeCard = (row) => {
    const place = document.querySelector('#all_records');

    const record = document.createElement('div')
    record.classList.add('record');

    const personaldataUl = document.createElement('ul');
    personaldataUl.classList.add('personaldata');


    const personaldataImgLi = document.createElement('li');
    personaldataImgLi.classList.add('image_element');
    const personaldataImg = document.createElement('img');
    personaldataImg.src = row.img_destination;
    personaldataImgLi.append(personaldataImg);

    const personaldataHrefsLi = document.createElement('li');

    const personaldataCvHrefParagraph = document.createElement('p');
    const personaldataCvHref = document.createElement('a');
    personaldataCvHref.href = `/cv/${row.cv_id}`;
    personaldataCvHref.innerText = `${row.firstname} ${row.lastname}`;
    personaldataCvHrefParagraph.append(personaldataCvHref);

    const personaldataTelHrefParagraph = document.createElement('p');
    const personaldataTelHref = document.createElement('a');
    personaldataTelHref.href= `tel:+${row.phone_country}${row.phone}`;
    personaldataTelHref.innerText = `+${row.phone_country} ${row.phone}`;
    personaldataTelHrefParagraph.append(personaldataTelHref);

    const personaldataMailHrefParagraph = document.createElement('p');
    const personaldataMailHref = document.createElement('a');
    personaldataMailHref.href = `mailto:${row.email}`;
    personaldataMailHref.innerText = `${row.email}`;
    personaldataMailHrefParagraph.append(personaldataMailHref);

    personaldataHrefsLi.append(personaldataCvHrefParagraph);
    personaldataHrefsLi.append(personaldataTelHrefParagraph);
    personaldataHrefsLi.append(personaldataMailHrefParagraph);

    personaldataUl.append(personaldataImgLi);
    personaldataUl.append(personaldataHrefsLi);

    const skillsUl = document.createElement('ul');
    skillsUl.classList.add('skills');


    const skillArrayLenght = row.skills.length;
    for(let i = 0;i<skillArrayLenght;i++){
        const skillLi = document.createElement('li');
        skillLi.innerText = row.skills[i];
        skillsUl.append(skillLi);
    }

    record.append(personaldataUl);
    record.append(skillsUl);

    setTimeout(() =>{
        place.append(record);
    }, 3000)
}

const deleteCards = () =>{
    let records = document.querySelectorAll('.record');
    for(let i =0; i< records.length; i++){
        setTimeout(() =>{
            records[i].remove();
        }, 3000)
    }
}

const makeBlank = ()=>{
    const place = document.querySelector('#all_records');

    const record = document.createElement('div')
    record.classList.add('record');

    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = 'No data Available';

    record.append(messageParagraph);

    setTimeout(() =>{
        place.append(record);
    }, 3000)
}