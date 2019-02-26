import axios from 'axios';


const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];

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
    day1Strg : `${day1.year}-${months[day1.month - 1]}-${day1.day}`,
    day2Strg : `${day2.year}-${months[day2.month - 1]}-${day2.day} 12:00:00`,
    day3Strg : `${day3.year}-${months[day3.month - 1]}-${day3.day} 12:00:00`,
}


const cities = {
    losAngeles : '5368381',
    malibu : '4586163',
    morroBay : '5374920',
    monterey : '5374376',
    santaCruz : '5393068',
    sanFran: '5391997'
}

export async function getResults(query) {
    const key = 'e79b88bcdd4110f3b77b07407f031ccd';
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    const res = await axios(`https://api.openweathermap.org/data/2.5/forecast?id=${cities.losAngeles}&appid=${key}`);//like fetch but work on all browsers and return json directly -better at error handling
    
    console.log(res)

    console.log(`Today ${res.data.list[0].weather[0].description}`);

    res.data.list.forEach((cur) => {              
                
        if(cur.dt_txt === days.day2Strg){
            console.log(`Tomorrow ${cur.weather[0].description}`);
        } else if(cur.dt_txt === days.day3Strg){
            console.log(`Next day ${cur.weather[0].description}`);
        }        
    });
}

///********* */

// export default class Weather {
//     constructor(location) {
//         this.location = location;
//     }

//     async getRecipe() {
//         try {
//             const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
//             this.title = res.data.recipe.title;
//             this.author = res.data.recipe.publisher;
//             this.img = res.data.recipe.image_url;
//             this.url = res.data.recipe.source_url;
//             this.ingredients = res.data.recipe.ingredients;
//         } catch (error) {
//             console.log(error);
//             alert('Something went wrong :(');
//         }
//     }