


const weatherDOM = {
    today: document.querySelector('.weather__day--1'),
    tomorrow: document.querySelector('.weather__day--2'),
    next: document.querySelector('.weather__day--3')
}

const weatherDesc = new Map();
weatherDesc.set('01d','url(../img/icons/clearSky.svg)')
weatherDesc.set('01n','url(../img/icons/clearSky.svg)')
weatherDesc.set('02d','url(../img/icons/fewClouds.svg)')
weatherDesc.set('02n','url(../img/icons/fewClouds.svg)')
weatherDesc.set('03d','url(../img/icons/scatteredClouds.svg)')
weatherDesc.set('03n','url(../img/icons/scatteredClouds.svg)')
weatherDesc.set('04d','url(../img/icons/brokenClouds.svg)')
weatherDesc.set('04n','url(../img/icons/brokenClouds.svg)')
weatherDesc.set('09d','url(../img/icons/showerRain.svg)')
weatherDesc.set('09n','url(../img/icons/showerRain.svg)')
weatherDesc.set('10d','url(../img/icons/rain.svg)')
weatherDesc.set('10n','url(../img/icons/rain.svg)')
weatherDesc.set('11d','url(../img/icons/thunderstorm.svg)')
weatherDesc.set('11n','url(../img/icons/thunderstorm.svg)')
weatherDesc.set('13d','url(../img/icons/snow.svg)')
weatherDesc.set('13n','url(../img/icons/snow.svg)')
weatherDesc.set('50d','url(../img/icons/mist.svg)')
weatherDesc.set('50n','url(../img/icons/mist.svg)')

const imgArr = [];

export function displayIcon(arr,id){
    
    //Loop through array and get matching weather icon url from map 
   
    arr.forEach((cur) =>{
        const imgUrl = weatherDesc.get(cur); // get key matching cur
        imgArr.push(imgUrl);//push urls      
    })     
    
    const dropdown = document.getElementById(id);
    
    //Select weather div under the selected dropdown

    const day1BG = dropdown.querySelector('.weather__day--1');
    const day2BG = dropdown.querySelector('.weather__day--2');
    const day3BG = dropdown.querySelector('.weather__day--3');

    //display url for each 
    day1BG.style.backgroundImage = imgArr[0];
    day2BG.style.backgroundImage = imgArr[1];
    day3BG.style.backgroundImage = imgArr[2];

}
