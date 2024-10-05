let btnFetch= document.getElementById("fetch");
let homeContainer= document.getElementById("home-container");
let dataDiv= document.getElementById("dataDiv");
dataDiv.className='hide';
let lat='';
let longi='';
console.log(homeContainer);
console.log(dataDiv);

function embedData(data,lat,lon)
{
    let ptag1= document.getElementById('p1');
    let ptag2= document.getElementById('p2');
    ptag1.innerText=`Lat: ${lat}`;
    ptag2.innerText=`Long: ${lon}`;
    /*----------------------first  lat long displaying done */

    let  frame = document.createElement("iframe");
    /*<iframe src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed" 
    width="800px" height="400" frameborder="0" style="border:0"></iframe>*/
    frame.setAttribute('src',`https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`);
    frame.setAttribute('height','300px');
    frame.setAttribute('frameborder','0');
    frame.setAttribute('style','border:0');
    //frame created and effect set

    //now create weather info  div
    let weatherDiv = document.createElement("div");
    weatherDiv.className='weather-div';
    // create inner heading
    let innerHeading= document.createElement('h1');
    innerHeading.innerText='Your Weather Data';
    innerHeading.className='weather-div-heading';
    console.log(innerHeading)
    //now create weather info div
    let weatherInfo= document.createElement('div');
    weatherInfo.className='weather-info';
    
    //now main thing  create info p from receive data
    let map=new Map();
    map.set('Location', data.location.name);
    map.set('Region' ,  data.location.region);
    map.set('Country' , data.location.country);
    map.set('Time Zone' , data.location.tz_id);
    map.set('Wind Speed' ,data.current.wind_kph);
    map.set('Wind Direction', data.current.wind_dir);
    map.set('Humidity' , data.current.humidity);
    map.set('Pressure', data.current.pressure_in);
    map.set('UV Index', data.current.uv);
    map.set('Feels Like', data.current.feelslike_c);

    // now iterate on this data and crete p 
    map.forEach((value,key)=>{
        let p= document.createElement('p');
        p.className='weather-p';
        p.innerText=`${key}:  ${value}`;
        weatherInfo.appendChild(p);
    })
    let weatherInfoParent= document.createElement('div');
    weatherInfoParent.className='weather-info-parent';
    weatherInfoParent.appendChild(innerHeading);
    weatherInfoParent.appendChild(weatherInfo);
    /*
    weatherInfo.appendChild(innerHeading);
    weatherDiv.appendChild(weatherInfo);*/
    weatherDiv.appendChild(weatherInfoParent);
    console.log(weatherInfo);
    // now append them all data div
    dataDiv.appendChild(frame);
    dataDiv.appendChild(weatherDiv);

}
async function getWeather(lat,lon) {
    try{
        let  response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1c3a27b7dbf44943bef71808240510&q=${lat},${lon}&aqi=no`)
        if(response.status!=200)
        {
            throw new Error("cant access  the data");
        }
        let data = await response.json();
        embedData(data,lat,lon);
        console.log(data);
    }
    catch(error)
    {
        console.log(error);
    }
    
}
function showPosition(Position)
{
    lat= Position.coords.latitude;
    longi= Position.coords.longitude;
    console.log(lat+" "+longi);
    getWeather(lat,longi);
}
function getLocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
btnFetch.addEventListener("click", function(){
    console.log(homeContainer);
    console.log(dataDiv);
    homeContainer.className='hide';
    dataDiv.className='data-container';
    getLocation();
})

/*window.addEventListener('load', function(event) {
    // Your code here
    homeContainer.className='Hcontainer';
    dataDiv.className='hide';
    console.log("i ran") ;
     console.log(dataDiv);
  });*/






