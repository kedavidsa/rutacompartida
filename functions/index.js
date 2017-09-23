const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.newuser = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const Url = user.photoURL;
  let ref = admin.database().ref("/usuarios").child(user.uid).set({photo: Url});
});
