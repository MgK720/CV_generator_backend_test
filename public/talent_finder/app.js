const form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    //deleteImages();
    const searchTerm = form.elements.verb_like.value;
    const config = { params: { verb_like: searchTerm } }
    const res = await axios.get(`/talentfinder/search`, config);
    //makeImages(res.data)
    console.log(res.data);
    form.elements.verb_like.value = '';
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            img.classList.add('addedImg')
            setTimeout(() =>{
                document.body.append(img)
            }, 3000)
        }
    }
}

const deleteImages = () =>{
    let images = document.querySelectorAll('img');
    for(let i =0; i< images.length; i++){
        setTimeout(() =>{
            images[i].remove();
        }, 3000)
    }
}