var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

//Allows Express app to handle data parsing 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservation = [
    {
        name: "name",
        phoneNumber: "phoneNumber",
        email: "email",
        unique: "unique"
    }
];

var waitList = [
    {
        // name: "name",
        // phoneNumber: "phoneNumber",
        // email: "email",
        // unique: "unique"
    }
];




//Get table reservation object (api)
app.get("/reservation", function (req, res) {
    res.json(reservation);
});

app.get("/waitlist", function (req, res) {
    res.json(waitList);
});


//Create new reservation - takes in JSON input from client 
app.post("/api/new", function(req, res) {
    var newReservation = req.body;
    var reserved = true;
    if (reservation.length <6) {
        reservation.push(newReservation);
        res.json(reserved);
    }
    else {
        waitList.push(newReservation);
        res.json(!reserved);
    }
    res.json(newReservation);
});



// Routes
// ===========================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/make", function (req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
    var allReservations = {};
    allReservations.reservation = reservation;
    allReservations.waitList = waitList;
    res.json(allReservations);
});


// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});