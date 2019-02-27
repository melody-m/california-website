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
            const res = await axios(`https://api.openweathermap.org/data/2.5/forecast?id=${this.location}&appid=${key}`);//like fetch but work on all browsers and return json directly -better at error handling
             
            //console.log(res);

            //1) Create forecast array and add today's weather
            this.weatherFrcst = [res.data.list[0].weather[0].icon];
    
            res.data.list.forEach((cur) => {      
                //2) Loop through the list of forecast and push in array weather for next 2 days at 12.00        
    
                if(cur.dt_txt === days.day2Strg){
                    this.weatherFrcst.push(cur.weather[0].icon);       //icon: "02d"             
                } else if(cur.dt_txt === days.day3Strg){
                    this.weatherFrcst.push(cur.weather[0].icon);                    
                }        
            });

            return this.weatherFrcst; //array of weather forecast icons

        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
}