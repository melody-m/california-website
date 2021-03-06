
class Slider {
    constructor(id) {
        this.dropdown = document.getElementById(id);
        this.contOn = this.dropdown.querySelectorAll('.off');
        this.contHid = this.dropdown.querySelectorAll('.hidden');
        this.wipe = this.dropdown.querySelectorAll('.dropdown__wipe');
        this.wipeArr= Array.from(this.wipe);
        this.corner = this.dropdown.querySelectorAll('.dropdown__triangle');
        this.closeBtn = this.dropdown.querySelector('.dropdown__closeBtn');
        this.gallery = this.dropdown.querySelectorAll('.gallery__img');
        this.galleryArr = Array.from(this.gallery);
    }

    displayCont(){
        this.contOn.forEach((cur) => {
            cur.classList.toggle('off');
        })
    }

    opacityCont(){
        this.contHid.forEach((cur) => {
            cur.classList.toggle('hidden');
        })
    }

    slideDown(){
        this.dropdown.classList.toggle('slideDown');
    }

    closeBtnOn(){
        this.closeBtn.style.visibility = 'visible';
    }

    closeBtnOff(){
        this.closeBtn.style.visibility = 'hidden';
    }

    wipeOff(){
        for(let i=0; i < this.wipeArr.length; i++){
            ((i) => {
                setTimeout(() => {
                    this.wipeArr[i].classList.remove('width'); // replace not supported with IE
                    this.wipeArr[i].classList.add('slideSideBar')
                }, 200 * i);
            })(i);
        }
    }

    wipeOn(){
        this.wipeArr.forEach((cur) => {
            cur.classList.remove('slideSideBar');
            cur.classList.add('width');
        })
    }

    cornerSlide(){
        this.corner.forEach((cur) =>{
            cur.style.transform = 'translateX(0)';
        });
    }
}


export const exploreDOM = {
    btnExplore : document.querySelectorAll('.trip__btn'),
    dropExplore : document.querySelectorAll('.dropdown'),
    closeExplore: document.querySelectorAll('.dropdown__closeBtn')
};

//SUPPORT FOR IE

export const buttonsExp = Array.from(exploreDOM.btnExplore);
export const buttonsClose = Array.from(exploreDOM.closeExplore);
export const buttonsDrop = Array.from(exploreDOM.dropExplore);


export const explore = new Map();

let indexImg = 0;
let interval = null;
let sliderOn =[];


export function getMatch(){   
    for (let i=0; i < buttonsDrop.length; i++){
        explore.set(buttonsExp[i].id, buttonsDrop[i].id)
    }
}

function slideDown(sliderObj){  

    sliderObj.displayCont();
    sliderObj.opacityCont();
    sliderObj.slideDown();
    sliderObj.closeBtnOn();

    setTimeout(()=>{
        sliderObj.wipeOff();
        sliderObj.cornerSlide();
    }, 300);
}


export function exploreSlider(id){

    const slider = new Slider(id);
    sliderOn.push(slider); // to keep track of slider currently on

    slideDown(slider);

    // Set auto gallery
    interval = setInterval(() => {
        displayGallery(indexImg);
        if(indexImg < sliderOn[0].galleryArr.length-1){
            indexImg ++;
        } else {
            indexImg = 0;
        }
    },3000);
}


export function closeSlider(){

    sliderOn[0].wipeOn();

    setTimeout(()=>{
        sliderOn[0].slideDown();
        sliderOn[0].closeBtnOff();
        sliderOn[0].opacityCont();
        sliderOn[0].displayCont();
    }, 400);

    setTimeout(() =>{
        sliderOn.pop(); // remove object from array to have only one slider obj at a time
        clearInterval(interval); // clear interval to stop auto gallery from playing in the background
    },1500);

    // Clear weather forecast in html so that it doesnt re-display it
    // Selecting first index is okay because there will only ever be one slider in the array
    const weatherList = sliderOn[0].dropdown.querySelectorAll('.weather__day--desc');
    const weatherIcon = sliderOn[0].dropdown.querySelectorAll('.weather__icon');

    const weatherListArr = Array.from(weatherList);
    const weatherIconArr = Array.from(weatherIcon);

    weatherIconArr.forEach((cur) =>{
        cur.parentElement.removeChild(cur);
    });

    weatherListArr.forEach((cur)=>{
        while (cur.firstChild) {
            cur.removeChild(cur.firstChild);
        }
    })
}


function displayGallery(index) {

    sliderOn[0].galleryArr.forEach((cur) =>{
        if(!cur.classList.contains('hidden')){
            cur.classList.add('hidden');
        }
    });
    sliderOn[0].galleryArr[index].classList.remove('hidden'); //replace not supported with IE
    sliderOn[0].galleryArr[index].classList.add('visible'); // replace not supported with IE
}
