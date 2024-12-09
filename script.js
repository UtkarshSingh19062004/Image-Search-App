const accesskey= "nyq1Gw0bwd8VKVjyWE1PoySaHE5AfQPEoV_WhtSs28I"
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");


let inputData="";
let page=1;

async function searchImages(){
    inputData=searchInputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    const response=await fetch(url);
    const data=await response.json();
    const results=data.results;

    if(page===1){
        searchResultsEl.innerHTML="";
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
      });
page++;
if(page>1){
    showMoreButtonEl.style.display="block";
}
}
formEl.addEventListener("submit",function(event){
    event.preventDefault();
    searchImages();
    page=1;
})
showMoreButtonEl.addEventListener("click", function(){
    searchImages();
  });
