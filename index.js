const api={
    // сначала пишем ссылку
     endpoint:"https://api.openweathermap.org/data/2.5/",

    // затем вставляем ключ
    key:"2c97ab08abc8ad6f52ff599bbffb43ae"
}
// console.log(api);

const input=document.querySelector('#input');
input.addEventListener("keypress", enter );

// 1-если у нас нажата клавиша энтер (13) 
// 2 и только тогда мы начинаем поиск

function enter(e){
  if (e.keyCode===13){
    //   вызываем доступ к функции getInfo то есть что будет написано в поиске, получаем доступ к что пишет пользователь в поисковике input.value
      getInfo (input.value); 
  }

}
// в этой функции мы пропишем все чтоб получить доступ к API
 async function  getInfo(data) {
  const res= await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`)
//   console.log(res);

const result=await res.json();
// console.log(result);
// console.log(result.sys.country);
// console.log(result.weather[0].description);
displayResult(result);
}
function displayResult(result){
  console.log(result)
  let city=document.querySelector('#city');
  city.textContent=`${result.name},${result.sys.country}`;

  getOurDate();
  

  // во второй let ставим innerHTML чтоб отображались градусы без тега span , textContent это только для текста
  let temperature=document.querySelector('#temperature');
// Math.round ,это для того чтоб округлить число температуры не 25,95 а 25 гралдусов и берем в скобки

  temperature.innerHTML=`${Math.round(result.main.temp)}<span>°</span>`

  let feelsLike=document.querySelector('#feelsLike');
  feelsLike.innerHTML=`<span>Feels like: ${ Math.round(result.main.feels_like)}°</span>`

  let conditions=document.querySelector('#conditions');
  conditions.innerHTML=`${result.weather[0].main}`;

  let variation=document.querySelector('#variation');
  variation.innerHTML='Min: '+ ` ${ Math.round(result.main.temp_min)}<span>°</span>`+ ' ' +'Max: '+ `${ Math.round( result.main.temp_max)}°</span>`


} 

function getOurDate(){
  // -1- сугодняшняя дата

  const myDate= new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // 2-день недели
//  let day=document.querySelector('#date').innerHTML= days[myDate.getDay()]; это убираем вынесем ниже, так как два раза мы не можем использовать #id date
let day=days[myDate.getDay()];

  // 3-число
//  let todayDate=document.querySelector('#date').innerHTML=myDate.getDate();
let todayDate=myDate.getDate();

  // 4-месяц

 let monthNow=months[myDate.getMonth()];
 console.log(monthNow)

  //  5-год
  let year=myDate.getFullYear();
console.log(year);

let showDate=document.querySelector("#date")
  
showDate.textContent=`${day}` + " " + `${todayDate}`+" " +`${monthNow}`+ " "+`${year}`;

}