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
  let ref = admin.database().ref("/usuarios").child(user.uid).set({photo: Url});
});
