console.log('start');

const explore = document.querySelector('.trip__btn');
const dropdown = document.querySelector('.dropdown');

const wipe = document.querySelectorAll('.dropdown__wipe');
wipeArr= Array.from(wipe);

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

function init(){
    setEventListeners();
}

init();




/********************************************************************************************************** */




/******************************************************************************************************************************* */

// document.addEventListener('scroll', () => {   

//     var y = window.scrollY; 
//     console.log(y);

//   } , {capture: false, passive: true});


// var path = document.getElementById("path");
// var path2 = document.getElementById("path2");

// var length = path.getTotalLength();
 

// path.style.strokeDasharray = length;
// path.style.strokeDashoffset = length;

// // path2.style.strokeDasharray = length;
// // path2.style.strokeDashoffset = length;

// function drawPath() {//start and end scroll
// var scrollpercent = (document.documentElement.scrollTop - 300) / 900;
//   var draw = length * scrollpercent;  
//   path.style.strokeDashoffset = length - draw;  
// }

// function drawPath2() {//if starts at 800px
//     var scrollpercent = (document.documentElement.scrollTop - 900) / 1200;
//       var draw = length * scrollpercent;  
//       path2.style.strokeDashoffset = length - draw;  
//     }

// function draw(){
//   drawPath();
//   // drawPath2();
// }

// window.addEventListener("scroll", draw);