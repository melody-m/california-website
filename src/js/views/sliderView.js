console.log('start');

const explore = document.querySelector('.trip__btn');
const dropdown = document.querySelector('.dropdown');

const wipe = document.querySelectorAll('.dropdown__wipe');
const wipeArr= Array.from(wipe);

const closeBtn = document.querySelector('.dropdown__closeBtn');

const exploreBtn  = document.getElementById('explore-1');

const stop1 = document.getElementById('dropdown-1');

const containerOn = document.querySelectorAll('.off');
const containerHidden = document.querySelectorAll('.hidden');

const sideBar = document.querySelector('.dropdown__sideBar');

const triangle = document.querySelectorAll('.dropdown__triangle');


//
const galleryImg = document.querySelectorAll('.gallery__img');
const galleryImgArr= Array.from(galleryImg);
const galleryBtn = document.querySelectorAll('.gallery__imgBtn');
const galleryBtnArr = Array.from(galleryBtn)

let indexImg = 0;
let interval = null;




function slideDown(){
    
    containerOn.forEach((cur) => {
        cur.classList.replace('off','on');
    })
    containerHidden.forEach((cur) => {
        cur.classList.replace('hidden','visible');
    })
    
    dropdown.classList.add('slideDown');
    closeBtn.style.visibility = 'visible';

    dropdown.addEventListener('transitionend',() => {

        for(let i=0; i < wipeArr.length; i++){
            ((i) => {
                setTimeout(() => {
                    wipeArr[i].classList.replace('width','slideSideBar'); 
                }, 200*i);                           
            })(i);
        }
        triangle.forEach((cur) =>{
            cur.style.transform = 'translateX(0)';
        });
    });
}

function exploreSlider(){
    //Slide down pannel
    slideDown();

    //Set auto gallery

    interval = setInterval(() => {
        displayGallery(indexImg);
        if(indexImg < galleryImgArr.length-1){
            indexImg ++;
        } else {
            indexImg = 0;
        }
    },3000);   
}

function closeSlider(){

    // Slider goes up, auto gallery stops

    containerHidden.forEach((cur) => {
        cur.classList.replace('visible','hidden');
    })
    containerOn.forEach((cur) => {
        cur.classList.replace('on','off');
    })
    dropdown.classList.toggle('slideDown');    
    closeBtn.style.visibility = 'hidden';
    clearInterval(interval);
}


function displayGallery(index) {   
    galleryImgArr.forEach((cur) =>{       
        if(!cur.classList.contains('hidden')){
            cur.classList.add('hidden');
        }
    });    
    galleryImgArr[index].classList.replace('hidden','visible');
        
}

function btnScaleUp(e){
    galleryBtnArr.forEach((cur) =>{
        if(cur != e.target){
            cur.classList.remove('scaleUp');
        }
    })
    e.target.classList.add('scaleUp');
}

function setEventListeners() {
    exploreBtn.addEventListener('click', exploreSlider);

    closeBtn.addEventListener('click', closeSlider);
    
    galleryBtnArr.forEach((cur, i) =>{    
        cur.addEventListener('click', (e) => {             
            btnScaleUp(e);
            clearInterval(interval);     
            displayGallery(i);    
        });
    });

}

export function init(){
    setEventListeners();
}