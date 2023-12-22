const result = document.getElementById("results");
const weatherState = document.querySelector(".weather-state");
const otherDetails = document.querySelector(".other-details");

document.querySelector(".invalid").style.display = "none"
function getWeather()
{
    weatherState.classList.remove("open")
    otherDetails.classList.remove("open")
    result.classList.remove("open")
    
    const city = document.getElementById("srch-city").value;
    const key = "670deb8c88f81ad202d667e2aa28cc83";
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
    .then(res =>{
        if(res.ok){
            return res.json()
        }
    })
    .then(res => {
        console.log(res);
        document.querySelector(".invalid").style.display = "none"
        let state = ""
        switch(res.weather[0].main){
            case "Clouds" : state = "imgs/cloud.png"
            break;
            case "Clear"  : state = "imgs/clear.png"
            break;
            case "Rain"   : state = "imgs/rain.png"
            break;
            case "Snow"   : state = "imgs/snow.png"
            break;
            default : state = "imgs/clear.png"
        }
        document.querySelector(".weather-state img").src = state;
        document.getElementById("temperature").innerText = Math.round(res.main.temp);
        document.getElementById("weather-describtion").innerHTML = res.weather[0].description;
        document.getElementById("humidity").innerHTML = `${res.main.humidity}%`;
        document.getElementById("wind-speed").innerHTML = `${res.wind.speed}km/h`
    })
    .then(()=>{
        setTimeout(() => {
            result.classList.add("open")
            weatherState.classList.add("open")
            otherDetails.classList.add("open")
        }, 600);
    })
    .catch(error => {
        document.querySelector(".invalid").style.display = "flex"
        weatherState.classList.remove("open")
        otherDetails.classList.remove("open")
        result.classList.add("open")
    })
}

document.getElementById("srch-btn").addEventListener("click",getWeather)

document.getElementById("srch-city").addEventListener("input",() => {
    if(document.getElementById("srch-city").value.length < 1)
    {
        result.classList.remove("open")
    }
})


