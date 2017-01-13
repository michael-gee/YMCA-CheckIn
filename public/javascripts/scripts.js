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

var pplAttending = [];
var pplNotAttending = [];

//function that displays users to the screen
 function displayUsers(dispDate) {

   var attendingList = document.getElementById("ppl-Attending");
   var notAttendingList = document.getElementById("ppl-Not-Attending");

   //Set Information/InnerHTML back to nothing so info can get appended
   attendingList.innerHTML = '';
   notAttendingList.innerHTML = '';
   pplAttending = [];
   pplNotAttending = [];

   var attendingRef = database.child(dispDate).child('attending');

   var notAttendingRef = database.child(dispDate).child('not_attending');

   attendingRef.on('value', snap => {
     if(snap.val() !== null){
       // FIX IT IS APPENDING TOO MANY NAMES IN PPL ARRAYS 
       for(var key in snap.val()){
         pplAttending.push(snap.val()[key].name);
       }

       for(var a = 0, x = pplAttending.length; a < x; a++){
         attendingList.innerHTML += "<ul class='attendee-list'>" +
         "<li class='attendee is-attending'>" +
          pplAttending[a] +
          "<img class='check' src='images/green-check.png' alt='Going'></li>" +
          "</ul>";
       }
     }else {
       attendingList.innerHTML += "<h1 class='empty-list'>No Users Submitted</h1>";
     }
   });


   notAttendingRef.on('value', snap => {
     if(snap.val() !== null){
       // FIX IT IS APPENDING TOO MANY NAMES IN PPL ARRAYS
       for(var key in snap.val()){
         pplNotAttending.push(snap.val()[key].name);
       }

       for(var b = 0, z = pplNotAttending.length; b < z; b++){
         notAttendingList.innerHTML += "<ul class='attendee-list'>" +
         "<li class='attendee no-show'>" +
          pplNotAttending[b] +
          "<img class='x' src='images/red-x.png' alt='Not Going'></li>" +
          "</ul>";
       }
     }else {
       notAttendingList.innerHTML += "<h1 class='empty-list'>No Users Submitted</h1>";
     }
   });

 }

// MOMENT.JS DATE CONFIGURATION

// Display Date with Moment.js that will be shown in the header
var displayDate = moment().format('dddd, MMMM Do YYYY');
document.getElementById("current-date").textContent = displayDate;
displayUsers(displayDate);

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
    displayUsers(displayDate);
  }

  if(operator === "plus"){
    displayDate = moment().add(dayDiff, 'days');
    displayDate = displayDate.format('dddd, MMMM Do YYYY')
    document.getElementById("current-date").textContent = displayDate;
    displayUsers(displayDate);
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

// Attendance Button Variables
var goingButton = document.getElementById('going-button');
var notGoingButton = document.getElementById('notGoing-button');
var userName = document.getElementById('userName');

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
