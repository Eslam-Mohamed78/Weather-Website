const documentEle = document;
let data = [];
const searchEle = documentEle.querySelector("#home .search input");
const findEle = documentEle.querySelector("#home .find");
// today elements
const todayHead = documentEle.querySelector("#home .today .head");
const todayCity = documentEle.querySelector("#home .today .content .city");
const todayTemp = documentEle.querySelector("#home .today .content .temp");
const todayStatus = documentEle.querySelector("#home .today .content .status");
// tomorrow elements
const tomorrowHead = documentEle.querySelector("#home .tomorrow .head ");
const tomorrowIcon = documentEle.querySelector("#home .tomorrow .content .icon");
const tomorrowGreatTemp = documentEle.querySelector("#home .tomorrow .content .great");
const tomorrowSmallTemp = documentEle.querySelector("#home .tomorrow .content .small");
const tomorrowStatus = documentEle.querySelector("#home .tomorrow .content .status");
// after tomorrow elements
const afterTomorrowHead = documentEle.querySelector("#home .after-tom .head");
const afterTomorrowIcon = documentEle.querySelector("#home .after-tom .content .icon");
const afterTomorrowGreatTemp = documentEle.querySelector("#home .after-tom .content .great");
const afterTomorrowSmallTemp = documentEle.querySelector("#home .after-tom .content .small");
const afterTomorrowStatus = documentEle.querySelector("#home .after-tom .content .status");

// ============= Date Object ================
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function gettingDate(d) {
  const dateObj = new Date(d);
  const today = weekday[dateObj.getDay()];
  const month = monthName[dateObj.getMonth()];
  const dayNum = dateObj.getDate();
  return [today, month, dayNum];
}

// ===== fetching data from weather api =====
async function weather(city) {
  const result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a98ebbee63a147c0877141605232202&q=${city}&days=3`
  );
  data = await result.json();
  console.log(city, data);
  return data;
}

async function weatherCall(city) {
  let dataObj = await weather(city);
  // console.log(dataObj.forecast.forecastday[0].date);
  let todayDate = gettingDate(dataObj.forecast.forecastday[0].date);
  let tomorrowDate = gettingDate(dataObj.forecast.forecastday[1].date);
  let afterTomDate = gettingDate(dataObj.forecast.forecastday[2].date);
  console.log(todayDate, tomorrowDate, afterTomDate);

  // adding today data
  todayHead.innerHTML = `${todayDate[0]} <span class="ms-auto">${todayDate[2]}${todayDate[1]}</span>`;
  todayCity.innerHTML = `${dataObj.location.name}`;
  todayTemp.innerHTML = `<span>${Math.trunc(dataObj.current.temp_c)}&deg;C</span> 
      <img
        src="${dataObj.current.condition.icon}"
        alt="icon condition"
      />`;
  todayStatus.innerHTML = `${dataObj.current.condition.text}`;

  // adding tomorrwo data
  tomorrowHead.innerHTML = `${tomorrowDate[0]}`;
  tomorrowIcon.innerHTML = `<img
    src="${dataObj.forecast.forecastday[1].day.condition.icon}"
    alt="condition" />`;
  tomorrowGreatTemp.innerHTML = `${dataObj.forecast.forecastday[1].day.maxtemp_c}&deg;C`
  tomorrowSmallTemp.innerHTML = `${dataObj.forecast.forecastday[1].day.mintemp_c}&deg;C`
  tomorrowStatus.innerHTML = `${dataObj.forecast.forecastday[1].day.condition.text}`

  // adding after-tomorrow data
  afterTomorrowHead.innerHTML = `${afterTomDate[0]}`;
  afterTomorrowIcon.innerHTML = `<img
  src="${dataObj.forecast.forecastday[2].day.condition.icon}"
  alt="condition" />`;
  afterTomorrowGreatTemp.innerHTML = `${dataObj.forecast.forecastday[2].day.maxtemp_c}&deg;C`
  afterTomorrowSmallTemp.innerHTML = `${dataObj.forecast.forecastday[2].day.mintemp_c}&deg;C`
  afterTomorrowStatus.innerHTML = `${dataObj.forecast.forecastday[2].day.condition.text}`

};
weatherCall('london')

searchEle.addEventListener("input", function () {
  console.log(searchEle.value);
  weatherCall(searchEle.value);
});
