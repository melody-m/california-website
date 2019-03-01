import * as sliderView from './views/sliderView';
import * as weatherView from './views/weatherView';
import * as tripView from './views/tripView';
import {cityForecast} from './models/Weather';


/********************************************************************************************************** */

const exploreDOM = sliderView.exploreDOM; // for event listeners

/********************************************************************************************************** */
//Ajax call for weather and display

async function forecast(cityID,dropID){    

    weatherView.renderLoader(dropID);

    try {
        // 2) Search for forecast
        await cityID.getForecast();

        // 3) Render results on UI
        weatherView.clearLoader(dropID);
        weatherView.displayIcon(cityID.weatherFrcst,dropID);        
        weatherView.displayInfo(cityID.weatherDesc,cityID.weatherTemp,dropID);
        
    } catch (err) {
        alert('Something wrong with the search...');       
    }

}

/*************************************************************************************************************************************************************/  
//Event listeners set up

function setEventListeners() {

    // set the scroll display of the roadtrip stops
    window.addEventListener('scroll', tripView.throttle(tripView.displayTrip, 200));

    // set button matching dropdown
    sliderView.getMatch();

    exploreDOM.btnExplore.forEach((cur) => {
        cur.addEventListener('click', (e) => {

            //Find button id and retrieve matching dropdown
            const target = e.target.id;
            const dropID = sliderView.explore.get(target); 
            const container = document.getElementById(dropID);            

            sliderView.exploreSlider(dropID);


            const wCityID = cityForecast.get(target); //get city matching explore btn
            
            forecast(wCityID, container);
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


