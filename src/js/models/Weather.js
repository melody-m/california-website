import axios from 'axios';


const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const daysArr = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

class Day {
    constructor (date) {
        this.day = date.getDate();
        this.month = date.getMonth() + 1;
        this.year = date.getFullYear();
    }
}
const dates = {
    today : new Date(),
    tomorrow : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    next : new Date(new Date().getTime() + 48 * 60 * 60 * 1000)    
}

const day1 = new Day(dates.today);
const day2 = new Day(dates.tomorrow);
const day3 = new Day(dates.next);

const days = {
    day1Strg : `${day1.year}-${months[day1.month - 1]}-${daysArr[day1.day-1]}`, //format day and months to get 02 and not 2 to match API results
    day2Strg : `${day2.year}-${months[day2.month - 1]}-${daysArr[day2.day-1]} 12:00:00`,
    day3Strg : `${day3.year}-${months[day3.month - 1]}-${daysArr[day3.day-1]} 12:00:00`,  
}


export default class Weather {
    constructor(location) {
        this.location = location;
    }

    async getForecast() {

        try{
            const key = 'e79b88bcdd4110f3b77b07407f031ccd';            
            const res = await axios(`https://api.openweathermap.org/data/2.5/forecast?id=${this.location}&units=metric&appid=${key}`);//like fetch but work on all browsers and return json directly -better at error handling

            console.log(res);

            //1) Create forecast array and add today's weather/desc/temp
            this.weatherFrcst = [res.data.list[0].weather[0].icon];
            this.weatherDesc = [res.data.list[0].weather[0].description];    

            const temp =  `${res.data.list[0].main.temp}&deg;C`; // temperature formatting
            this.weatherTemp = [temp];

    
            res.data.list.forEach((cur) => {      
                //2) Loop through the list of forecast and push in array weather for next 2 days at 12.00        
    
                if(cur.dt_txt === days.day2Strg){
                    this.weatherFrcst.push(cur.weather[0].icon);     
                    this.weatherDesc.push(cur.weather[0].description); 

                     //3)Format temperature                    
                     const temp2=`${cur.main.temp}&deg;C`;
                     this.weatherTemp.push(temp2);

                } else if(cur.dt_txt === days.day3Strg){
                    this.weatherFrcst.push(cur.weather[0].icon);                    
                    this.weatherDesc.push(cur.weather[0].description); 
                   
                    const temp2=`${cur.main.temp}&deg;C`;
                    this.weatherTemp.push(temp2);
                }        
            });
           
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
}



export const citiesObj = {
    wLosAngeles : new Weather('5368361'),
    wMalibu : new Weather('5405889'), //Ventura coordinate - closer found
    wMorroBay : new Weather('5374920'),
    wMonterey : new Weather('5374376'),
    wSantaCruz : new Weather('5393068'),
    wSanFran : new Weather('5391997'),
}

export const cityForecast = new Map();

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