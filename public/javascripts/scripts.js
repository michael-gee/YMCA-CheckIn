//FIREBASE AUTHENTICATE
var config = {
    apiKey: "AIzaSyB_V7V8jeBy_VXpKUsqCxYHYaWpFwr3cHU",
    authDomain: "ymca-check-in.firebaseapp.com",
    databaseURL: "https://ymca-check-in.firebaseio.com",
    storageBucket: "ymca-check-in.appspot.com",
    messagingSenderId: "764612790588"
};
firebase.initializeApp(config);

// Firebase Config
var database = firebase.database().ref();

// MOMENT.JS DATE CONFIGURATION

// Display Date with Moment.js that will be shown in the header
var displayDate = moment().format('dddd, MMMM Do YYYY');
document.getElementById("current-date").textContent = displayDate;

// DAY ARROW FUNCTIONS
//ARROW VARIABLES
var leftArrow = document.getElementById("left-arrow");
var rightArrow = document.getElementById("right-arrow");

//ARROW EVENT LISTENERS
leftArrow.addEventListener("click", function(){
  updateDay("prev");
});
rightArrow.addEventListener("click", function(){
  updateDay("next");
});

//ARROW Functions

// Moment.js Number Manipulation
var subtractDays = 0;
var addDays = 0;
// Day Differential Variable
var dayDiff;

// Function That
function dateChangerFunc(operator) {
  if(operator === "minus"){
    displayDate = moment().subtract(dayDiff, 'days');
    displayDate = displayDate.format('dddd, MMMM Do YYYY')
    document.getElementById("current-date").textContent = displayDate;
  }

  if(operator === "plus"){
    displayDate = moment().add(dayDiff, 'days');
    displayDate = displayDate.format('dddd, MMMM Do YYYY')
    document.getElementById("current-date").textContent = displayDate;
  }
}

//Previous Day Functions
function updateDay(dir){
  if(dir === "prev"){
    if(subtractDays === addDays && subtractDays === 0 && addDays === 0){
      subtractDays++;
      dayDiff = subtractDays;
      dateChangerFunc("minus");
    }else if(subtractDays === addDays && subtractDays > 0 && addDays > 0){
      subtractDays++;
      dayDiff = subtractDays - addDays;
      dateChangerFunc("minus");
    }else if(subtractDays > addDays){
      subtractDays++;
      dayDiff = subtractDays - addDays;
      dateChangerFunc("minus");
    }else if(addDays > subtractDays){
      subtractDays++;
      dayDiff = addDays - subtractDays;
      dateChangerFunc("plus");
    }
  }else if(dir === "next"){
    if(subtractDays === addDays && subtractDays === 0 && addDays === 0){
      addDays++;
      dayDiff = addDays;
      dateChangerFunc("plus");
    }else if(subtractDays === addDays && subtractDays > 0 && addDays > 0){
      addDays++;
      dayDiff = addDays - subtractDays;
      dateChangerFunc("plus");
    }else if(addDays > subtractDays){
      addDays++;
      dayDiff = addDays - subtractDays;
      dateChangerFunc("plus");
    }else if(subtractDays > addDays){
      addDays++;
      dayDiff = subtractDays - addDays;
      dateChangerFunc("minus");
    }
  }
}

//function that displays users to the screen
 function displayUsers(dispDate) {



 }

// Attendance Button Variables
var goingButton = document.getElementById('going-button');
var notGoingButton = document.getElementById('notGoing-button');
var name = document.getElementById('userName');

// addindg events to elements
goingButton.addEventListener('click', saveToAttending);
notGoingButton.addEventListener('click', saveToNotAttending);

// Attendance Button Functions
function saveToAttending() {
    if (userName.value) {
        database.child(displayDate).child('attending').push({
            name: userName.value
        }).then(function () {
            console.log(userName.value, 'attending');
            // Clear form text fields
            resetName();
            userName.focus();
        });
    } else {
        alert("Please input your name before submitting attendance.");
    }
}

function saveToNotAttending() {
    if (userName.value) {
        database.child(displayDate).child('not_attending').push({
            name:userName.value
        }).then(function () {
            console.log(userName.value, 'NOT attending');
            // Clear form text fields
            resetName();
            userName.focus();
        });
    } else {
        alert("Please input your name before submitting attendance.");
    }
}

// after saving in database clear input field
function resetName(){
    userName.value = '';
}
