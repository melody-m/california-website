
const weatherDesc = new Map();

weatherDesc.set('01d','img/icons/clearSky.svg')
weatherDesc.set('01n','img/icons/clearSky.svg')
weatherDesc.set('02d','img/icons/fewClouds.svg')
weatherDesc.set('02n','img/icons/fewClouds.svg')
weatherDesc.set('03d','img/icons/scatteredClouds.svg')
weatherDesc.set('03n','img/icons/scatteredClouds.svg')
weatherDesc.set('04d','img/icons/brokenClouds.svg')
weatherDesc.set('04n','img/icons/brokenClouds.svg')
weatherDesc.set('09d','img/icons/showerRain.svg')
weatherDesc.set('09n','img/icons/showerRain.svg')
weatherDesc.set('10d','img/icons/rain.svg')
weatherDesc.set('10n','img/icons/rain.svg')
weatherDesc.set('11d','img/icons/thunderstorm.svg')
weatherDesc.set('11n','img/icons/thunderstorm.svg')
weatherDesc.set('13d','img/icons/snow.svg')
weatherDesc.set('13n','img/icons/snow.svg')
weatherDesc.set('50d','img/icons/mist.svg')
weatherDesc.set('50n','img/icons/mist.svg')

const imgArr = [];

export const renderLoader = (element) => {

    const weatherBox = element.querySelector('.dropdown__sideBar--weather');
    const loader = `
        <div class="loader">Loading ...</div>
    `;
    weatherBox.insertAdjacentHTML('beforeend', loader);
};

export const clearLoader = (element) => {

    const loader = element.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
}

export function displayIcon(arr,container){
    
    //Loop through array and get matching weather icon url from map 
   
    arr.forEach((cur) =>{
        const imgUrl = weatherDesc.get(cur); // get key matching cur
        imgArr.push(imgUrl);//push urls     
    })        
    
    
    //Select weather div under the selected dropdown and assign img

    const days = container.querySelectorAll('.weather__day'); 

    days.forEach((cur, i)=>{
        cur.style.backgroundImage = imgArr[i];
        cur.insertAdjacentHTML('beforeend', `<div class="weather__icon"><img src="${imgArr[i]}" alt=""></div>`);
    }) 
}

export function displayInfo(arrDesc, arrTemp,container){
    
    const days = container.querySelectorAll('.weather__day');   

    days.forEach((cur, i)=>{
        cur.insertAdjacentHTML('beforeend', `<div class="weather__desc">${arrDesc[i]}</div>`);
        cur.insertAdjacentHTML('beforeend', `<div class="weather__temp">${arrTemp[i]}</div>`);
    }) 

}
