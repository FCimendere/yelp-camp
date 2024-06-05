const endpoint = "https://api.tvmaze.com/search/shows/";
const btn = document.querySelector('#searchButton');
const form = document.querySelector('#searchForm');


form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const searhedMovie = form.elements.query.value;
    const res = await getRequest(searhedMovie);
    addBoxOnScreen(res.data);
    form.elements.query.value = '';
});


const addBoxOnScreen = (shows) => {
    const itemNums = shows.length;
    console.log(itemNums);
    console.dir(shows);

    document.querySelector('.movielist').innerHTML = "";

    for(let i=0 ; i<itemNums ; i++) {
        const card = document.createElement("div");
        card.setAttribute("class", "card container");
        card.setAttribute("id", `main-card-${i}`);
        document.querySelector('.movielist').appendChild(card);
        // document.body.append(card); 
  
        const cardRow = document.createElement("div");
        cardRow.setAttribute("class", "row");
        cardRow.setAttribute("id", `row-${i}`);
        document.getElementById(`main-card-${i}`).appendChild(cardRow);
  
        const cardCol= document.createElement("div");
        cardCol.setAttribute("class", "col");
        cardCol.setAttribute("id", `col-${i}`);
        document.getElementById(`row-${i}`).appendChild(cardCol);

        const newImg = document.createElement('IMG');
        newImg.setAttribute("class", "imageShow card-img-top");
        newImg.setAttribute("id", "imageShow");
        if (shows[i].show.image != null ){
            newImg.src = shows[i].show.image.medium; 
        } else {
            newImg.src = "https://images.pexels.com/photos/3709369/pexels-photo-3709369.jpeg?auto=compress&cs=tinysrgb&w=800" 
        }
        document.getElementById(`col-${i}`).appendChild(newImg);


        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        cardBody.setAttribute("id", `card-body-${i}`);
        document.getElementById(`col-${i}`).appendChild(cardBody);

        const newH5 = document.createElement("h5");
        newH5.setAttribute("class", "card-title");
        newH5.setAttribute("id", `card-title-${i}`);
        document.getElementById(`card-body-${i}`).appendChild(newH5);
        const newMovieTitle = document.querySelector(`#card-title-${i}`);
        newMovieTitle.innerText = shows[i].show.name;

        const linkBody = document.createElement("div");
        linkBody.setAttribute("class", "link-body");
        linkBody.setAttribute("id", `link-body-${i}`);
        document.getElementById(`col-${i}`).appendChild(linkBody);
        
        const anchor = document.createElement("a");
        anchor.setAttribute("class", "card-link");
        anchor.setAttribute("id", `card-link-${i}`);
        anchor.innerText = `${shows[i].show.name}'s Detail`;
        anchor.setAttribute('href', `${shows[i].show.url}`);
        document.getElementById(`link-body-${i}`).appendChild(anchor);
    }
}


const getRequest = async (searhedMovie) => {
    try{
        const response = await axios.get(endpoint, {params: {q: `${searhedMovie}`}});
        return response;
    } catch(err){
        return err;
    }
}
