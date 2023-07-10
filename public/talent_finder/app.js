const form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    //deleteImages();
    const searchTerm = form.elements.verb_like.value;
    const config = { params: { verb_like: searchTerm } }
    const res = await axios.get(`/talentfinder/search`, config);
    makeCards(res.data)
    console.log(res.data);
    form.elements.verb_like.value = '';
})

const makeCards = (data) => {
    for (let row of data) {
        makeCard(row);    
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

const deleteImages = () =>{
    let images = document.querySelectorAll('img');
    for(let i =0; i< images.length; i++){
        setTimeout(() =>{
            images[i].remove();
        }, 3000)
    }
}