import * as sliderView from './views/sliderView';
import * as weatherView from './views/weatherView';
import * as tripView from './views/tripView';
import {cityForecast} from './models/Weather';


/********************************************************************************************************** */

const exploreDOM = sliderView.exploreDOM; // for event listeners

const roadtrip = document.getElementById('roadtrip-list');
const roadtripList = document.querySelector('.navigation__sublist');
const menu = document.getElementById('navi-toggle');
const menuLinks = document.querySelectorAll('.navigation__item');
const menuSublinks = document.querySelectorAll('.navigation__sublink');

/********************************************************************************************************** */
//Ajax call for weather and display

async function forecast(cityID,dropID){    

    weatherView.renderLoader(dropID);

    try {
        // Retrieve weather data
        await cityID.getForecast();

        //Pass it on to render weather on UI
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

    //1) Page Scroll 
    window.addEventListener('scroll', tripView.throttle(tripView.displayTrip, 200)); // throttle check for scroll changes every .2s

    //2) Menu : navigation sublist extend

    roadtrip.addEventListener('click', () =>{
        roadtripList.classList.replace('listOff', 'listOn');
    })

    menu.addEventListener('change', ()=>{
        roadtripList.classList.replace('listOn', 'listOff'); //collapse roadtrips when unchecked
    })

    //3) Menu : cancel scroll anim on menu calls so that trip is immediately visible

    menuSublinks.forEach((cur) => {        
        cur.addEventListener('click', tripView.fastDisplay);
    });
    
    
    //4) Menu : check if phone - if yes -> auto close menu as it'd be full screen

    if (window.matchMedia('(max-width: 600px)').matches) {
        menuLinks.forEach((cur) =>{
            cur.addEventListener('click', () =>{                        
                if(!cur.querySelector('.navigation__sublist')){
                    menu.checked = false;
                }
            });
        });
        menuSublinks.forEach((cur) =>{
            cur.addEventListener('click', () =>{                               
                    menu.checked = false;
            });
        });
    }

    //5) Dropdown Sliders: set trip button matching dropdown
    sliderView.getMatch();

    exploreDOM.btnExplore.forEach((cur) => {
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
    exploreDOM.closeExplore.forEach((cur) => {
        cur.addEventListener('click', sliderView.closeSlider)
    });     
}

function init(){
    setEventListeners();
}


init();



