import * as sliderView from './views/sliderView';
import * as weatherView from './views/weatherView';
import * as tripView from './views/tripView';
import {cityForecast} from './models/Weather';
import {buttonsExp, buttonsClose} from './views/sliderView';


/********************************************************************************************************** */


const indexDOM = {
    roadtrip : document.getElementById('roadtrip-list'),
    roadtripList : document.querySelector('.navigation__sublist'),
    menu : document.getElementById('navi-toggle'),
    menuLinks : document.querySelectorAll('.navigation__item'),
    menuSublinks : document.querySelectorAll('.navigation__sublink')
};


const menuLinksArr = Array.from(indexDOM.menuLinks);
const menuSubLArr = Array.from(indexDOM.menuSublinks);


//Ajax call for weather and display

async function forecast(cityID, dropID){

    weatherView.renderLoader(dropID);

    try {
        // Retrieve weather data
        await cityID.getForecast();

        // Pass it on to render weather on UI
        weatherView.clearLoader(dropID);
        weatherView.displayIcon(cityID.weatherFrcst, dropID);
        weatherView.displayInfo(cityID.weatherDesc, cityID.weatherTemp, dropID);
        
    } catch (err) {
        alert('Something wrong with the search...');
    }
}


/*************************************************************************************************************************************************************/  
//Event listeners set up

function setEventListeners() {

    //Loader

    window.addEventListener("load", () => {

        const loaders = document.querySelectorAll('.load');
        const loadersArr = Array.from(loaders);

        loadersArr.forEach((cur)=>{
            cur.style.display = "none";
        })
        document.querySelector('body').classList.remove('noscroll');
    });

    //1) Page Scroll 
  
    window.addEventListener('scroll', tripView.throttle(tripView.displayTrip, 400)); // throttle check for scroll changes every .4s
        
    //2) Menu : navigation sublist extend

    indexDOM.roadtrip.addEventListener('click', () =>{
        indexDOM.roadtripList.classList.remove('listOff');
        indexDOM.roadtripList.classList.add('listOn');
    })

    indexDOM.menu.addEventListener('change', ()=>{
        indexDOM.roadtripList.classList.remove('listOn'); //collapse roadtrips when unchecked
        indexDOM.roadtripList.classList.add('listOff');
    })

    //3) Menu : cancel scroll anim on menu calls so that trip is immediately visible

    menuSubLArr.forEach((cur) => {        
        cur.addEventListener('click', tripView.fastDisplay);
    });
    
    
    //4) Menu : check if phone - if yes -> auto close menu as it'd be full screen

    if (window.matchMedia('(max-width: 600px)').matches) {
        menuLinksArr.forEach((cur) =>{
            cur.addEventListener('click', () =>{                        
                if(!cur.querySelector('.navigation__sublist')){
                    indexDOM.menu.checked = false;
                }
            });
        });
        menuSubLArr.forEach((cur) =>{
            cur.addEventListener('click', () =>{                               
                indexDOM.menu.checked = false;
            });
        });
    }

    //5) Dropdown Sliders: set trip button matching dropdown
    sliderView.getMatch();

    buttonsExp.forEach((cur) => {
        cur.addEventListener('click', (e) => {

            //Find button id and retrieve matching dropdown
            const target = e.target.id;
            const dropID = sliderView.explore.get(target); 
            const container = document.getElementById(dropID);            

            sliderView.exploreSlider(dropID);

            //get city matching explore btn to call forecast on it
            const wCityID = cityForecast.get(target); 
            
            forecast(wCityID, container);
        })
    })

    //6) Dropdown Sliders : set close button
    buttonsClose.forEach((cur) => {
        cur.addEventListener('click', sliderView.closeSlider)
    });     
}

function init(){
    setEventListeners();
}


init();

