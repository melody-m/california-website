import * as sliderView from './views/sliderView';
import * as weatherView from './views/weatherView';
import Weather from './models/Weather';

// import Recipe from './models/Recipe';
// import List from './models/List';
// import Likes from './models/Likes';
// import * as listView from './views/listView';
// import * as likesView from './views/likesView';
// import { elements, renderLoader, clearLoader } from './views/base';
/********************************************************************************************************** */

const exploreDOM = sliderView.exploreDOM;


const citiesObj = {
    wLosAngeles : new Weather('5368381'),
    wMalibu : new Weather('4586163'),
    wMorroBay : new Weather('5374920'),
    wMonterey : new Weather('5374376'),
    wSantaCruz : new Weather('5393068'),
    wSanFran : new Weather('5391997'),
}

const cityForecast = new Map();
cityForecast.set('explore-1', citiesObj.wLosAngeles);
cityForecast.set('explore-2', citiesObj.wLosAngeles);
cityForecast.set('explore-3', citiesObj.wMalibu);
cityForecast.set('explore-4', citiesObj.wMalibu);
cityForecast.set('explore-5', citiesObj.wMorroBay);
cityForecast.set('explore-6', citiesObj.wMorroBay);
cityForecast.set('explore-7', citiesObj.wMonterey);
cityForecast.set('explore-8', citiesObj.wMonterey);
cityForecast.set('explore-9', citiesObj.wSantaCruz);
cityForecast.set('explore-10', citiesObj.wSanFran);

// const weatherLosAngeles = new Weather(citiesID.losAngeles);


async function forecast(cityID,dropID){    

    try {
        // 2) Search for forecast
        await cityID.getForecast();

        // 3) Render results on UI

        weatherView.displayIcon(cityID.weatherFrcst,dropID);
        
        
    } catch (err) {
        alert('Something wrong with the search...');       
    }

}

/*************************************** */

function setEventListeners() {

    // 1) set button matching dropdown
    sliderView.getMatch();

    exploreDOM.btnExplore.forEach((cur) => {
        cur.addEventListener('click', (e) => {

            //2) Find button id and retrieve matching dropdown
            const target = e.target.id;
            const dropID = sliderView.explore.get(target); 
            
            sliderView.exploreSlider(dropID);

            const wCityID = cityForecast.get(target); //get city matching explore btn
            
            forecast(wCityID, dropID);
        })
    })

    exploreDOM.closeExplore.forEach((cur) => {
        cur.addEventListener('click', sliderView.closeSlider)
    });     
}

function init(){
    setEventListeners();
}


init();


