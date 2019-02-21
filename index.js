console.log('start');

const explore = document.querySelector('.trip__btn');
const dropdown = document.querySelector('.dropdown');

const wipe = document.querySelectorAll('.dropdown__wipe');
wipeArr= Array.from(wipe);

const closeBtn = document.querySelector('.dropdown__closeBtn');

const nextBtn = document.querySelector('.arrow__right');
const previousBtn = document.querySelector('.arrow__left');

const stop1 = document.getElementById('stop-1');
const stop2 = document.getElementById('stop-2');


// explore.addEventListener('click', () => {    
//     dropdown.classList.add('slideDown');
//     closeBtn.style.visibility = 'visible';

//     dropdown.addEventListener('transitionend',() => {

//         for(let i=0; i < wipeArr.length; i++){
//             ((i) => {
//                 setTimeout(() => {
//                     wipeArr[i].classList.replace('width','slideSideBar'); 
//                 }, 200*i);                           
//             })(i);
//         }
//     });
// });


// closeBtn.addEventListener('click', () => {
//     dropdown.classList.toggle('slideDown');
//     closeBtn.style.visibility = 'hidden';
// })

//****************************************** Stops slider ************************************************* */

// const stops = document.querySelectorAll('.container');
// const stopsArr = Array.from(stops);

// let previousStop = -1;
// let currentStop = 0;
// let nextStop = 1;

// nextBtn.addEventListener('click', () => {
        
//     if (currentStop < stopsArr.length -1){
//         stopsArr[currentStop].classList.replace('current', 'previous');
//         stopsArr[nextStop].classList.replace('next', 'current');
//         currentStop ++;
//         nextStop = currentStop + 1;
//         previousStop = currentStop - 1;
//     }
// });

// previousBtn.addEventListener('click', () => {

//     if (currentStop != 0){
//         stopsArr[currentStop].classList.replace('current', 'next');
//         stopsArr[previousStop].classList.replace('previous', 'current');
//         currentStop --;
//         nextStop = currentStop + 1;
//         previousStop = currentStop - 1;
//     }    
// });

/******************************************************************************************************************************* */

// document.addEventListener('scroll', () => {   

//     var y = window.scrollY; 
//     console.log(y);

//   } , {capture: false, passive: true});


var path = document.getElementById("path");
var path2 = document.getElementById("path2");

var length = path.getTotalLength();
 

path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;

path2.style.strokeDasharray = length;
path2.style.strokeDashoffset = length;


window.addEventListener("scroll", draw);

function draw(){
    drawPath();
    drawPath2();
}


function drawPath() {//start and end scroll
var scrollpercent = (document.documentElement.scrollTop - 300) / 900;
  var draw = length * scrollpercent;  
  path.style.strokeDashoffset = length - draw;  
}

function drawPath2() {//if starts at 800px
    var scrollpercent = (document.documentElement.scrollTop - 900) / 1200;
      var draw = length * scrollpercent;  
      path2.style.strokeDashoffset = length - draw;  
    }
