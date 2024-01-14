const API_KEY = "bb1a251843de45a3acb6188059d58228";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=>{
    fetchNews("India")
} );

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();

    // console.log(data);

    bindData(data.articles);
}

function bindData(articles) {
    const cardContainer = document.getElementById("cards-container");
    const templateCards = document.getElementById("template-news-card");

    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = templateCards.content.cloneNode(true);
        fillDataIncard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}


function fillDataIncard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;


    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(`${article.url}`, "_blank")
    })
}

let selectedItem = null;
function onNavItem(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    selectedItem?.classList.remove('active');
    selectedItem = navItem;
    selectedItem.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    selectedItem?.classList.remove('active');
    selectedItem = null;
})

function reload(){
    window.location.reload();
}