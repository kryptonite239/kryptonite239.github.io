const timeEL=document.getElementById("time");
const dateEL=document.getElementById("curr_date");
const dayEl=document.getElementById("curr_day");
const currhum=document.getElementById("curr_hum");
const currpres=document.getElementById("curr_pre");
const currLocation=document.getElementById("location_name");
const nextEl=document.getElementById("next_info");
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
const API_KEY='662c8500ae844893a5d200627230402';

setInterval(()=>{
    
    const time=new Date();
    const month=time.getMonth();
    const day=time.getDay();
    const date=time.getDate();
    const hour=time.getHours();
    const dates=date<10?('0'+date):date;
    const hoursin12hr=hour>=13?hour%12:hour;
    const min=time.getMinutes();
    const mins=min<10?('0'+min):min;
    const year=time.getFullYear();
    const ampm=hour>=12?"PM":"AM";
    timeEL.innerHTML=hoursin12hr+":"+mins+" "+ampm;
    dayEl.innerHTML=days[day];
    
    dateEL.innerHTML=months[month]+" "+dates+", "+year;
},1000);

getwetherdata();
 
function getwetherdata(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let{latitude,longitude}=success.coords;
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=662c8500ae844893a5d200627230402&q=${latitude} ${longitude}&days=8&aqi=no&alerts=yes`).then(res=>res.json()).then(data=>{
         
      
        showWeatherData(data);
        })
    })  
        
    
    
    
    
}
document.getElementById("Sydney").onclick=function(){func("Sydney")};
document.getElementById("Kolkata").onclick=function(){func("Kolkata")};
document.getElementById("Paris").onclick=function(){func("Paris")};
document.getElementById("New York").onclick=function(){func("New York")};
document.getElementById("Mumbai").onclick=function(){func("Mumbai")};
document.getElementById("Tokyo").onclick=function(){func("Tokyo")};
function func(parameter){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=662c8500ae844893a5d200627230402&q=${parameter}&days=8&aqi=no&alerts=yes`).then(res=>res.json()).then(data=>{
        console.log(data);  
      
        showWeatherData(data);

        })
}

function showWeatherData(data){
   
    let{humidity,pressure_in,temp_c,wind_degree,wind_kph,feelslike_c,vis_km}=data.current;
    // let{last_updated}=data.current;
    // let curd=new Date(last_updated).toString();

    // let curt=curd.split(" ");

    // timeEL.innerHTML=curt[4];
    let{text}=data.current.condition;
    let info=' ';
    let obj=data.forecast.forecastday;
    for(let x in obj ){
      if(x!=0){
          // let{avgtemp_c}=obj[x].day;
          //         console.log(avgtemp_c);
          //         if(avgtemp_c){
            let{date}=obj[x];
            let d=new Date(date);
            let a=d.toString();
            
            
            const b=a.split(" ");
            
                  info+=`<div class="day2">
                  <div class="day_2_display">
                  <div class="day2_icon">
                      <img src="images/1x/${obj[x].day.condition.text}.png">
                  </div>
                  <div class="day2_temp" id="day2_temp">${obj[x].day.avgtemp_c}°</div>
              </div>
                  <div class="day2_main_info">
                      <div class="day2_weather">
                      <h1 class="day2_sky">${obj[x].day.condition.text}</h1>
                      <h1 class="day2_day">${b[0]}</h1>
                  </div>
                  <div class="day2_sec_info">
                      <h1 class="day2_date">${b[1]} ${b[2]}</h1>
                  </div>
              </div>
              </div>`
              
                  // }
              
              // let{avgtemp_c}=obj[x][y].date;
             
          
          
      }
      
    }
    nextEl.innerHTML=info; 
    let{icon}=data.current.condition;
    icon=`images/1x/${text}.png`;
    document.getElementById("today_icon").innerHTML=`<img src=${icon}>`;
    let{name,country}=data.location;
    currhum.innerHTML="Humidity: "+humidity;
    currpres.innerHTML="Pressure: "+pressure_in;
    currLocation.innerHTML=`<h1>${name}, ${country}</h1>`;
    document.getElementById("temp_now").innerHTML=`<h1>${temp_c}°</h1>`;
    document.getElementById("today_sky").innerHTML=text;
    document.getElementById("today_main_info").innerHTML=`<div class="main_info">
    <h2 class="day_temp">Wind Speed: ${wind_kph} kph</h2>
    <h2 class="night_temp">Feels like: ${feelslike_c}°</h2>
  </div>
  <div class="sec_info">
      <h2 class="day_wind">Wind Degree: ${wind_degree} Deg</h2>
      <h2 class="day_visibility">Visibility: ${vis_km} Km</h2>
  </div>
  <div class="footer"><p>All The Temperatures Mentioned Are In Celcius</p></div>`;
  
//   console.log(info);
   
  

//   let info=`<h1>Hello<h1>`;
//     data.forecast.forecastday.forEach(()=>{
//         // if(idx!=0){
//         //     let{avgtemp_c}=day;
//         //     let{text}=day.condition;
//         // info+=`
//         // <div class="day2">
//         //         <div class="day_2_display">
//         //         <div class="day2_icon">
//         //             <img src="images/1x/cloudy.png">
//         //         </div>
//         //         <div class="day2_temp">${avgtemp_c}°</div>
//         //     </div>
//         //         <div class="day2_main_info">
//         //             <div class="day2_weather">
//         //             <h1 class="day2_sky">${text}</h1>
//         //             <h1 class="day2_day">Sunday</h1>
//         //         </div>
//         //         <div class="day2_sec_info">
//         //             <h1 class="day2_date">Feb 04</h1>
//         //         </div>
//         //     </div>
//         //     </div>
//         // `;
//         // }
//     })
//     nextEl.innerHTML=info;
}
