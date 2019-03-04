
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
        this.galleryBtn = this.dropdown.querySelectorAll('.gallery__imgBtn');
        this.galleryBtnArr = Array.from(this.galleryBtn);
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
    closeBtnOn(){ //TO IMPROVE
        this.closeBtn.style.visibility = 'visible';
    }
    closeBtnOff(){
        this.closeBtn.style.visibility = 'hidden';
    }
    wipeOff(){
        for(let i=0; i < this.wipeArr.length; i++){
            ((i) => {
                setTimeout(() => {
                    this.wipeArr[i].classList.replace('width','slideSideBar'); //replace width 100% by slidesidebar 0%
                }, 200*i);                           
            })(i);
        }
    }

    wipeOn(){
        
        this.wipeArr.forEach((cur) => {
            // cur.style.transition = "all .5s";
            cur.classList.replace('slideSideBar','width'); 
        })     
    }

    cornerSlide(){
        this.corner.forEach((cur) =>{                      
            cur.style.transform = 'translateX(0)';
        });  
    }

}

//DOM FOR EVENT LISTENER
export const exploreDOM = {
    btnExplore : document.querySelectorAll('.trip__btn'),
    dropExplore : document.querySelectorAll('.dropdown'), 
    closeExplore: document.querySelectorAll('.dropdown__closeBtn') 
}

export const explore = new Map();

let indexImg = 0;
let interval = null;
let sliderOn =[];

//FUNCTIONS

export function getMatch(){
    for (let i=0; i < exploreDOM.dropExplore.length; i++){
        explore.set(exploreDOM.btnExplore[i].id, exploreDOM.dropExplore[i].id)
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

    //Create new Slider object

    const slider = new Slider(id);
    sliderOn.push(slider); // keep track of slider currently on

    //Slide down pannel with all animations
    slideDown(slider);

    //Set auto gallery
    
    interval = setInterval(() => {
        console.log('img');
        displayGallery(indexImg);
        if(indexImg < sliderOn[0].galleryArr.length-1){
            indexImg ++;
        } else {
            indexImg = 0;
        }
    },3000);   
}

export function closeSlider(){

    //Select slider obj stored in array and kick animations
    
    sliderOn[0].wipeOn();

    setTimeout(()=>{
        sliderOn[0].slideDown();
        sliderOn[0].closeBtnOff();    
        sliderOn[0].opacityCont();
        sliderOn[0].displayCont();
    }, 400);

    
    setTimeout(() =>{
        sliderOn.pop();     //remove object from array so that only one slider obj at any time -
        clearInterval(interval);   //clear interval to stop auto gallery
    },1500);  

    //Clear weather forecast in html so that it doesnt re-display it
    const weatherList = sliderOn[0].dropdown.querySelectorAll('.weather__day--desc');
    const weatherIcon = sliderOn[0].dropdown.querySelectorAll('.weather__icon');

    weatherIcon.forEach((cur) =>{
        cur.parentElement.removeChild(cur);
    })
    
    weatherList.forEach((cur)=>{
        while (cur.firstChild) {
            cur.removeChild(cur.firstChild);
        }
    })

}


function displayGallery(index) {   

    //console.log(sliderOn[0].galleryArr);
    sliderOn[0].galleryArr.forEach((cur) =>{       
        if(!cur.classList.contains('hidden')){
            cur.classList.add('hidden');
        }
    });    
    sliderOn[0].galleryArr[index].classList.replace('hidden','visible');        
}

function btnScaleUp(e){
    galleryBtnArr.forEach((cur) =>{
        if(cur != e.target){
            cur.classList.remove('scaleUp');
        }
    })
    e.target.classList.add('scaleUp');
}

function getID(e){
    const fullID = e.target.id;
    const splitID = fullID.split('-');
    const ID = splitID[1]; 
    return ID;

}

//////////////////////


// function setEventListeners() {

//     // 1) set button matching dropdown
//     getMatch();

//     exploreDOM.btnExplore.forEach((cur) => {
//         cur.addEventListener('click', (e) => {

//             //2) Find button id and retrieve matching dropdown
//             const target = e.target.id;
//             const dropID = explore.get(target); 
            
//             exploreSlider(dropID);
//         })
//     })

//     exploreDOM.closeExplore.forEach((cur) => {
//         cur.addEventListener('click', closeSlider)
//     });     
// }

// export function init(){
//     setEventListeners();
// }



////////////////////////////////////////////////////////////////////

    // galleryBtnArr.forEach((cur, i) =>{    
    //     cur.addEventListener('click', (e) => {             
    //         btnScaleUp(e);
    //         clearInterval(interval);     
    //         displayGallery(i);    
    //     });
    // });