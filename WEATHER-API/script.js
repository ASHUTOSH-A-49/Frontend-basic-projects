document.addEventListener('DOMContentLoaded',function(){
    const cityinp = document.getElementById('city-input');
    const weatherbtn = document.getElementById('get-weather-btn');
    const result = document.getElementById('weather-info');
    const errormsg  = document.getElementById('error-msg');
    const cityname = document.getElementById('city-name');
    const temp = document.getElementById('temperature');
    const descr = document.getElementById('description');
    const API_KEY = "0d46a5f12995b38d4492eb43e22c3360";  //Env variable

    // NOTE - whenever making a call to someone else's server remember 
    // 1. server may throw you some erroe!
    // 2. database is always in another continent(so it might take some time )


    weatherbtn.addEventListener('click',async function(){
        const cityn = cityinp.value.trim();
        
        // empty string considered as false value in javascript 
        if(!cityn) return;

        try {


               const weatherdata = await fetchweatherdata(cityn);
               displayweatherdata(weatherdata)
        } catch (error) {
            showerror();
        }


    })

    async function fetchweatherdata(city){
        //gets the data
        // NOTE: take a look at fetch api for javascript which allow us to make request to APIs 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);  //using await here to deal with promises 
        // console.log(city)
        // console.log(typeof response)   //on doing this we get type of response as object 
        // console.log("Response",response);

        if(!response.ok){
            // throw new Error("City was not Found!!");
            console.error("City not Found!!");
        
        }
        const data = await response.json(); //converting response into javascript object 
        return data;

        //***now what this function does is make request to the api and then fetch it and convert into json then return it

    }

    function displayweatherdata(data) {
        //displays the data
        console.log(data)

        //EXTRACTING THE DATA(from data json object return from fetchweatherdata() function)  ***IMP***
        const {name,main,weather} = data;
        cityname.textContent = name;

        //remove hiddden from display:
        result.classList.remove('hidden');
        temp.textContent = `Temperature : ${main.temp}`;
        descr.textContent = `Weather : ${weather[0].description}`;
    }

    function showerror() {
        result.classList.add('hidden');
        errormsg.classList.remove('hidden')
    }


})