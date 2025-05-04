//get element from html document
const search_city = document.getElementById("search-city")
const search_btn = document.getElementById("search-btn")
const content = document.querySelector(".content")

// define EndPoint & Api_Key & City 
const EndPoint = `https://api.openweathermap.org/data/2.5/weather`
const Api_Key = "d90b07d449382e781ea0b46d2b30eb42"


function Search_City(city){

    //if search arabic display arabic, if english display english
    let lang;
    if(/[\u0600-\u06ff]/.test(city))
        lang = "ar"
    else
        lang = "en"
    
    //protect url from breaking due to spaces&character
    const cityEncode = encodeURIComponent(city)

    const url = `${EndPoint}?q=${cityEncode}&appid=${Api_Key}&lang=${lang}&units=metric`

    axios.get(url)
    .then(res =>{
        
        const icon = res.data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        
        content.innerHTML = `
            <h2 id="city-name">${res.data.name}</h2>
            <img id="icon" src = ${iconUrl}></img>
            <h3 id="temperature">${res.data.main.temp}&deg;C</h3>
            <h4 id="description">${res.data.weather[0].description}</h4>
            `
    })
    .catch((error) => {
        content.innerHTML = `
            <h3 id="city-name"> City Not Found </h3>
            `
        console.error("ُError:",error.response.data.message)
    })
}


search_btn.addEventListener("click", ()=>{
    if(search_city.value !== "")
        Search_City(search_city.value)
    else
        alert("ُPlease Enter City Name")
})


