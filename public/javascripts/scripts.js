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

// Display Date with Moment.js that will be shown in the header
var displayDate = moment().format('dddd, MMMM Do YYYY');
document.getElementById("current-date").textContent = displayDate;

// current Date -> 11/11/2016 format
var currentDate = moment().format("L");
//Replace the slashes (/) with dashes (-)
currentDate = currentDate.replace("/", "-").replace("/", "-");
currentDate = currentDate + "/";

 console.log(currentDate);

 function displayUsers() {

   var attendingRef = 22;
   var notAttendingRef = 22;

 }

// Button Functions
// get elements from DOM
var goingButton = document.getElementById('going-button');
var notGoingButton = document.getElementById('notGoing-button');
var name = document.getElementById('name');

// addindg events to elements
goingButton.addEventListener('click', saveToAttending);
notGoingButton.addEventListener('click', saveToNotAttending);

function saveToAttending() {
    if (name.value) {
        database.child(displayDate).child('attending').push({
            name: name.value
        }).then(function () {
            console.log(name.value, 'attending');
            // Clear form text fields
            resetName();
            name.focus();
        });
    } else {
        console.log('TODO info to user:  fill up the form')
    }
}

function saveToNotAttending() {
    if (name.value) {
        database.child(displayDate).child('not_attending').push({
            name: name.value
        }).then(function () {
            console.log(name.value, 'NOT attending');
            // Clear form text fields
            resetName();
            name.focus();
        });
    } else {
        console.log('TODO info to user:  fill up the form')
    }
}

// after saving in database clear input field
function resetName(){
    name.value = '';
}
