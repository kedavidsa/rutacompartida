const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.newuser = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const Url = user.photoURL;
  var https = require("https");
  var fs = require("fs");
  console.log(Url);
  var file = fs.createWriteStream("file.jpg");
  var request = https.get(Url, response => {
    response.pipe(file);
    console.log(file);
    firebase
      .storage()
      .ref()
      .child("images/" + user.uid + ".jpg")
      .put(file)
      .then(function(snapshot) {
        console.log("Uploaded a user photo!");
      });
  });
});
