import * as sliderView from './views/sliderView';
import * as weatherView from './views/weatherView';
import Weather from './models/Weather';

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

// Function throttle to reduce number of calls
function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

const tripCont = document.querySelectorAll('.trip__container');
const tripIcon = document.querySelectorAll('.trip__icon');
const tripInfo = document.querySelectorAll('.trip__info');


const tripMatch = new Map();

function getTripMatch(){
    for (let i=0; i < tripCont.length; i++){
        tripMatch.set(tripIcon[i], tripCont[i])
    }
}

function isInViewport(elem){
    //get position data of element in the page
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

function displayTrip(){
    //set icon - container match in map
    getTripMatch();

    tripIcon.forEach((cur) => {
        if (isInViewport(cur)) {
            //get the container associated to icon
            const box = tripMatch.get(cur);
            box.classList.remove('hidden');
            box.style.transform = 'translate(0)';
        }
    })

    tripInfo.forEach((cur) => {
        if (isInViewport(cur)) {
            cur.classList.remove('hidden');
            cur.style.transform = 'translateX(0)';
        }
    })
}


window.addEventListener('scroll', throttle(displayTrip, 200));



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


