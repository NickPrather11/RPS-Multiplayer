var firebaseConfig = {
  apiKey: "AIzaSyCQwhMpGPFS8wqCkRypCXUaVxOe2mZgml0",
  authDomain: "test-7c38b.firebaseapp.com",
  databaseURL: "https://test-7c38b.firebaseio.com",
  projectId: "test-7c38b",
  storageBucket: "test-7c38b.appspot.com",
  messagingSenderId: "1084629551515",
  appId: "1:1084629551515:web:ca74a9aa882f8a3c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var connectionsRef = database.ref("/connections");
var con;
var connectedRef = database.ref(".info/connected");
var name = prompt("Enter your name or username: ");
var player1 = name;
var player2 = "Player 2";
var choices = ["Rock", "Paper", "Scissors"];
function displayChoices() {
  choices.forEach(function(choice) {
    var newDiv = $("<div>").attr("id", choice);
    newDiv.addClass("RPSchoice");
    newDiv.text(choice);
    $("#player1").append(newDiv);
    $("#player2").append(newDiv);
  });
}

connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    // log to root database
    // Remove user from the connection list when they disconnect.
  }
});
// Number of online users is the number of objects in the presence list.
connectionsRef.on("value", function(snapshot) {
  $("#connected-viewers").text(snapshot.numChildren() + " players available");
});

//initial display
$("#player1").html("<h3>" + player1 + "</h3>");
$("#status").html("<h3>" + "Vs." + "</h3>");
$("#player2").html("<h3>" + player2 + "</h3>");

if (player2 !== "Player 2") {
  displayChoices();
}
//Show who's online and list of users in available player div.
//When someone loads the page and enters their name, push it to an array
connectionsRef.once("value").then(function(snapshot) {
  console.log(snapshot.val());
  con = connectionsRef.push({
    name: name,
    timeAdded: firebase.database.ServerValue.TIMESTAMP
  });
  con.onDisconnect().remove();
});
connectionsRef.on(
  "child_added",
  function(snapshot) {
    var availPlayer = $("<div>").text(snapshot.val().name);
    availPlayer.attr("id", snapshot.key);
    $("#availPlayers").append(availPlayer);
    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);

connectionsRef.on("child_removed", function(snapshot) {
  console.log(snapshot);
  $("#" + snapshot.key).remove();
});

//onClick to chose opponent from this list
//onClick to chose rock, paper, or scissors only if an opponent is chosen.
//Logic for RPS game
