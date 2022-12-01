const prevDateDisabled = document.getElementsByName("dateValue")

//Code for Time and Date
//date and time
let time = document.querySelector('.time');
let dateTime = document.querySelector('.date-time');
//DIGITAL WATCH
function updateClock() {
// Get the current time, day , month and year
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

/*TIME AND DATE*/

// store day and month name in an array
let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


// format date and time
//hours = hours % 12 || 12;
minutes = minutes < 10 ? `0${minutes}` : minutes;
seconds = seconds < 10 ? `0${seconds}` : seconds;
date = date < 10 ? `0${date}` : date;

// display date and time
let midday = "AM";
midday = (hours >= 12) ? "PM" : "AM";
time.innerHTML = `${hours} : ${minutes} : ${seconds}  ${midday}`;
dateTime.innerHTML =`${dayNames[day]}   ${date}-${monthNames[month]}-${year}`
}
//Yesrterday date disabled
let today = new Date().toISOString().split('T')[0];
prevDateDisabled[0].setAttribute('min', today);

updateClock();
setInterval(updateClock, 1000);

function themeFunction() {
  let element = document.body;
  element.classList.toggle("dark-mode");
}