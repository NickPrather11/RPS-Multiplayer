// Display divs for game title, boxes for players 1 and 2 and status, chatbox, and list of players to choose from.
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
var connectedRef = database.ref(".info/connected");
var player1 = prompt("Enter your name or username: ");
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
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
// Number of online users is the number of objects in the presence list.
connectionsRef.on("value", function(snapshot) {
  $("#connected-viewers").text(snapshot.numChildren() + " players available");
  // Display "names" of connected players
});

var player1 = prompt("Enter your name or username: ");
//initial display
$("#player1").html("<h3>" + player1 + "</h3>");
$("#status").html("<h3>" + "Vs." + "</h3>");
$("#player2").html("<h3>" + player2 + "</h3>");
//Show who's online and list of users in available player div
//onClick to chose opponent from this list
//onClick to chose rock, paper, or scissors
//Logic for RPS game
