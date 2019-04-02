
const tripCont = document.querySelectorAll('.trip__container');
const tripFlag = document.querySelectorAll('.trip__flag'); //to flag entry in viewport ahead of container
const tripInfo = document.querySelectorAll('.trip__info');
const menuTrips = document.querySelectorAll('.navigation__sublink');

const tripMatch = new Map();
const menuMatch = new Map();
const imgAlt = new Map();

imgAlt.set(0, 'Marina Del Rey Harbour');
imgAlt.set(1, 'Santa Monica Pier');
imgAlt.set(2, 'Malibu Beach');
imgAlt.set(3, 'Santa Barabara');
imgAlt.set(4, 'Morro Bay');
imgAlt.set(5, 'San Simeon');
imgAlt.set(6, 'Big Sur');
imgAlt.set(7, 'Monterey Bay');
imgAlt.set(8, 'Santa Cruz');
imgAlt.set(9, 'San Francisco');


// SUPPORT FOR IE - doesnt loop through nodeList correctly
const tripContArr = Array.from(tripCont);
const tripFlagArr = Array.from(tripFlag);
const tripInfoArr = Array.from(tripInfo);
const menuTripsArr = Array.from(menuTrips);


function getTripMatch(){
    for (let i=0; i < tripContArr.length; i++){
        tripMatch.set(tripFlagArr[i], tripContArr[i])
    }
}


function getMenuMatch(){
    for (let i=0; i < tripContArr.length; i++){
        menuMatch.set(menuTripsArr[i], tripContArr[i])
    }
}


function isInViewport(elem){
    // Get position data of element in the page
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function throttle to reduce number of calls
export function throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  }


export function displayTrip(){
    // Set flag - container match in map
    getTripMatch();

    tripFlagArr.forEach((cur, i) => {
        if (isInViewport(cur)) {
            const box = tripMatch.get(cur);
            box.classList.remove('hidden');
            box.style.transform = 'translate(0)';

            const img = `<img srcset="img/trips/${i}-S.jpg 480w, img/trips/${i}-L.jpg 900w"
            sizes="(max-width:56.25em) 66vw,(max-width: 37.5em) 80vw"
            alt="${imgAlt.get(i)}"
            class="trip__photo--img"
            src="img/trips/${i}-L.jpg">`

            if(!box.querySelector('.trip__photo--img')){
                box.querySelector('.trip__photo').insertAdjacentHTML('afterbegin',img);
            }
        }
    });

    tripInfoArr.forEach((cur) => {
        if (isInViewport(cur)) {
            cur.classList.remove('hidden');
            cur.style.transform = 'translateX(0)';
        }
    })
}


export function fastDisplay(){
    //set menu sublink - container match in map
    getMenuMatch();

    menuTripsArr.forEach((cur) =>{
        const box = menuMatch.get(cur);
        box.classList.remove('hidden');
        box.style.transform = 'translate(0)';

        const infoTrip = box.querySelector('.trip__info');
        infoTrip.classList.remove('hidden');
        infoTrip.style.transform = 'translateX(0)';
    })
}

