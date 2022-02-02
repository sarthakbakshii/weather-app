
let weatherApikey = "c6a83800817e0c5062c06ac43c5d3d96";
let mapApiKey = "AIzaSyDNNxEHbpPSDkk5jpUbQXuGKXRRlLleHYM";

// ------------------------- test run for wearther api
async function getCordinates(cityname){
  let city = cityname;

     let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApikey}`;
     let res = await fetch(url);
    //  console.log(res);
     let data = await res.json();
    //  console.log(data)
     return data;  
}


async function getWeather(lat,lon){
 
    console.log(lat,lon)
    

     let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${weatherApikey}`
      // let url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${weatherApikey}`
     let res = await fetch(url);
     let data = await res.json();
     console.log(data)
    //  console.log(data.coord);
}
// getWeather()


// ============================================ main function
function emptyField(){
  document.getElementById("city").value = null
}
 function showEmpty() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'We dont have such data!'
            })
            document.getElementById("maindisplay").innerHTML = null
        }
        

// -------------------------------------------------------------------------------- main working  
document.getElementById("search").addEventListener("click", async () =>{
  let cityname = document.getElementById("city").value;
  console.log(cityname);

  document.getElementById("maindisplay").innerHTML = null

  // ------ geting data for 1 day form 1 api
   let data1 =  await getCordinates(cityname);
   console.log(data1)
   if(data1.cod == "404"){
     showEmpty()
     emptyField();
     document.getElementById("map").innerHTML = null
   }
   else{
        //  ---------------------------- embeding map
        let map = document.getElementById("map");
        map.style.width = "auto";
        map.style.visibility = "visible"
        map.innerHTML=`
        <iframe class="iframe_active" width="450" height="250" frameborder="0" style="border:0"
              src="https://www.google.com/maps/embed/v1/place?key=${mapApiKey}&q=${cityname}" allowfullscreen>
          </iframe>
        `;

        //  -------- fetching cordinates
        let lat = data1.coord.lat
        let lon = data1.coord.lon;

        // --------- temprature conversion
        let temp = Math.round(data1.main.temp - 273) + "°C";
        let temp_min = Math.round(data1.main.temp_min - 273) + "°C";
        let temp_max = Math.round(data1.main.temp_max - 273) + "°C";
        let pressure = data1.main.pressure + " Pa";
        let humidity = data1.main.humidity + "%";

        // ---------- udt to ist time conversion
        let sunrize = data1.sys.sunrise;
        sunrize = window.moment(sunrize*1000).format('HH:mm a');
        let sunset = data1.sys.sunset;
        sunset = window.moment(sunset *1000).format(`HH:mm a`)

        // ---------- weather and its icon
        let weather = data1.weather[0].description
        let img = "http://openweathermap.org/img/wn/" + data1.weather[0].icon + "@2x.png";
        let windSpeed = data1.wind.speed +" naut";

        // ----------- date and day
        const date = new Date();

        let day = date.getDay();
        switch (day) {
          case 1: day ="Monday"; break;
          case 2: day ="Tuesday"; break;
          case 3: day ="Wednesday"; break;
          case 4: day ="Thursday"; break;
          case 5: day ="Friday"; break;
          case 6: day ="Saturday"; break;
          case 7: day ="Sunday"; break;
        }
        const tareek = moment().format("DD/MM/YYYY");

        let displatBox2 = document.createElement("div");
        displatBox2.className ="displatBox2";
        displatBox2.id = "displatBox2";
        displatBox2.innerHTML =
        `
           
        <div class="leftDisplay">
            <div class="datal">
                <img src="${img}" alt="">
                <div class="discription">${weather}</div>
                <h4 class="day" style="margin-top:40px;margin-right:auto">${tareek}</h4>
            </div>
            <div class="data">
                <h4 class="day">${day}</h4>
                <h3 class="ctemp">${temp}</h3>
                <h3 class="mintemp">Min temp: ${  temp_min}</h3>

                <h3 class="maxtemp">Max temp: ${  temp_max}</h3>
            </div>
        </div>
        <div class="rightDisplay">
            <div class="left">
                                <span> L</span>atitude <br>
                                <span> L</span>ongitude <br>
                                <span> P</span>ressure <br>
                                <span> H</span>umidity <br>
                                <span> S</span>unrise Time <br>
                                <span> S</span>unset Time <br>
                                <span> W</span>ind Speed <br>

            </div>
            <div class="right">
                    <span> ${lat} </span> <br>
                    <span> ${lon} </span> <br>
                    <span>  ${pressure} </span> <br>
                    <span>  ${humidity} </span>  <br>
                    <span>  ${sunrize} </span>  <br>
                    <span>  ${sunset} </span>  <br>
                    <span>  ${windSpeed} </span>  <br>

            </div>
        
        </div>

    
        `;
        document.getElementById("maindisplay").append(displatBox2)

        console.log(lat,lon,temp,temp_min,temp_max,windSpeed,pressure,humidity,sunrize,sunset,weather,tareek,day,img)
        }

  


  emptyField();
})