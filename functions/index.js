const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.crearViaje = functions.database
.ref("/{pushId}")
.onWrite(event => {
    const userRutas = event.data.val();

    var rutasKeys=Object.keys(userRutas);

    rutasKeys.forEach(function(key) {
        
        console.log(key);

        var ruta=userRutas[key];

        if (event.data.exists() && event.data.previous.exists()) {
            if (ruta.estado == 2) {
                if (event.data.previous.val()[key].estado == 1) {

                    var db = admin.database();
                    var ref = db.ref("/viajes");
                    ref.push({
                        end: ruta.end,
                        init: ruta.init,
                        nombre: ruta.nombre,
                        date: new Date(),
                        types: ruta.types
                    }).then(function (viajeRecord) {
                            // See the UserRecord reference doc for the contents of userRecord.
                            console.log("Successfully created new viaje:", viajeRecord.uid);
                            event.data.ref.update({
                                uid: userRecord.uid
                            });
                        })
                        .catch(function (error) {
                            console.log("Error creating new viaje:", error);
                        });
                

                }
            }
        }
    });
    
});