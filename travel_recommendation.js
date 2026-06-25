let travelData = {};
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

fetch('travel_recommendation_api.json')
    .then( response =>
        response.json()
    )
    .then( data => {
        travelData = data;
    })
    .catch( err =>
        console.log(":\ Error: "+ err)
    )

function searchResult() {
    const keyword = document.getElementById('searchLoc').value.trim().toLowerCase();
    const country = travelData.countries.find( country =>
        country.name.trim().toLowerCase() === keyword
    );
    if(country){
        return country.cities;
    }
    const beach = travelData.beaches.find( beach =>
        beach.name.trim().toLowerCase() === keyword
    )
    if(beach){
        return [beach];
    }
    const temple = travelData.temples.find( temp =>
        temp.name.trim().toLowerCase() === keyword
    )
    if(temple){
        return [temple];
    }
    if(keyword === "beach" || keyword === "beaches" || keyword === "ocean"){
        return travelData.beaches;
    }
    if(keyword === "temple" || keyword === "temples" || keyword === "religious"){
        return travelData.temples;
    }
    return [];
}

function showSearchResult() {
    const result = searchResult();
    clearSearchResult();
    const resultWindow = document.createElement('section');
    resultWindow.classList.add('result-window');
    resultWindow.innerHTML = "<h1>Search Result</h2>";
    document.getElementById('results-container').appendChild(resultWindow);
    result.forEach(site => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${site.imageUrl}" alt="${site.name}">
            <h2>${site.name}</h2>
            <p>${site.description}</p>
        `;
        resultWindow.appendChild(card);
    });
}

function clearSearchResult() {
    document.getElementById('searchLoc').value = "";
    const resultWindow = document.getElementsByClassName("result-window")[0];
    if(resultWindow){
        resultWindow.remove();
    }
}

searchBtn.addEventListener("click", showSearchResult);
clearBtn.addEventListener("click", clearSearchResult);