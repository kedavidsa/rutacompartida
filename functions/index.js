
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
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCb-zSaO_XizGF7fgnsBeLX5-MeRvVMagw'
  });




exports.crearViaje = functions.database
.ref("/usuarios/{pushId}/rutas")
.onWrite(event => {
    const rutas = event.data.val();  
      
    console.log(rutas);

    var keys=Object.keys(rutas);  
    console.log(keys);
    keys.forEach((function(key) {
        console.log(key);
        var ruta=rutas[key];

        if (event.data.exists() && event.data.previous.exists()) {
            console.log("Updated executed");
            if (ruta.estado == 2) {
                console.log("Ruta estado 2");
                if (event.data.previous.val()[key].estado == 1) {
                    console.log("Ruta estado previo 1. Creando viaje");

                    //First we check if exist a travel that match my conditions
                    var db = admin.database();
                    var ref = db.ref("/viajes");

                    // Attach an asynchronous callback to read the data at our viajes reference
                    /*ref.on("value", function(snapshot) {
                        console.log(snapshot.val());
                        if(snapshot.val()!=null)
                        {
                            
                            var keysViajes=Object.keys(snapshot.val());  
                            console.log(keysViajes);
                            
                            var viajeCreado=false;
                            //keysViajes.forEach(function(keyViaje) {
                            for(var i=0;i<keysViajes.length;i++){
                                var keyViaje=keysViajes[i];
                                console.log("Key viaje"+keyViaje);
                                
                                var ref2 = db.ref("/viajes/"+keyViaje);
                                ref2.on("value", function(snapshot2) {
                                    console.log(snapshot2 +"Viaje2");
                                });
                                
                                var viaje=snapshot.val()[keyViaje];
                                console.log(viaje);
                                var distance1=distance(viaje.init.lat,viaje.init.long,ruta.init.lat,ruta.init.lat);
                                var distance2=distance(viaje.end.lat,viaje.end.long,ruta.end.lat,ruta.end.lat);
                                console.log(distance1+" d1");
                                console.log(distance2+" d2");
    
                                //Validate by range
                                if(!viajeCreado&&distance1<1&&distance2<1){
                                    //Im a kilomether near to the viaje
                                    //Add me to the current viaje
                                    console.log("Hizo match con una ruta");
    
                                    ref.child(viaje).child(viajeros).set(
                                       {  userid: pushId ,
                                          rutaid: ruta.key
                                        });
                                    
    
                                    
                                    viajeCreado=true;
                                    
                                }
                                                    
                                
                                
                                
                            }

                            if(!viajeCreado){
                                
                                console.log("No Hizo match, creatndo nuevo");
                                //No matches, we have to create a new one
                                ref.push({
                                    end: ruta.end,
                                    init: ruta.init,
                                    nombre: ruta.key,
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
                        else{

                            console.log("No existen viajes, creatndo nuevo");
                            //No matches, we have to create a new one
                            ref.push({
                                end: ruta.end,
                                init: ruta.init,
                                nombre: ruta.key,
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

                        
                        


                    }, function (errorObject) {
                        console.log("The read failed: " + errorObject.code);
                    });*/

                    ref
                    .on("value", snap => {
                        let viajes = snap.val();
                        
                        console.log(snap);
                        var cont=0;
                        if(viajes==null||viajes.lenght==0)
                        {
                            console.log("No existen viajes, creatndo nuevo");
                            //No matches, we have to create a new one
                            let viajeKey = ref.push().key
                            ref.child(viajeKey).set(
                            {
                                key : viajeKey,
                                end: ruta.end,
                                init: ruta.init,
                                nombre: ruta.key,
                                date: new Date(),
                                types: ruta.types,
                                viajeros:[{key:ruta.key}]
                            }).then(function (viajeRecord) {
                                    // See the UserRecord reference doc for the contents of userRecord.
                                    console.log("Successfully created new viaje:", viajeRecord.uid);
                                    event.data.ref.update({
                                        uid: userRecord.uid
                                    });

                                    var ref2 = db.ref("/usuarios/"+pushId);
                                    ref2.child('viajes').push(viajeKey);
                                  


                                })
                                .catch(function (error) {
                                    console.log("Error creating new viaje:", error);
                                });

                        }else{

                            var itemsProcessed = 0;
                            var viajeCreado=false;
                            snap.forEach(via => {
                                let viaje = via.val();
                                
                                console.log(viaje);
                                var distance1=distance(viaje.init.lat,viaje.init.long,ruta.init.lat,ruta.init.long);
                                var distance2=distance(viaje.end.lat,viaje.end.long,ruta.end.lat,ruta.end.long);
                                console.log(distance1+" d1");
                                console.log(distance2+" d2");
    
                                //Validate by range
                                if(!viajeCreado&&distance1<1&&distance2<1){
                                    //Im a kilomether near to the viaje
                                    //Add me to the current viaje
                                    console.log("Hizo match con una ruta");
    
                                    ref.child(viaje.key).child('viajeros').push(ruta.key);

                                    var ref2 = db.ref("/usuarios/"+pushId);
                                    ref2.child('viajes').push(viajeKey);
                                    
    
                                    
                                    viajeCreado=true;
                                    
                                    
                                }

                                itemsProcessed++;
                                if(!viajeCreado&&itemsProcessed === snap.length) {

                                    console.log("No matches viajes, creatndo nuevo");
                                    //No matches, we have to create a new one
                                    let viajeKey = ref.push().key
                                    ref.child(viajeKey).set(
                                    {
                                        key : viajeKey,
                                        end: ruta.end,
                                        init: ruta.init,
                                        nombre: ruta.key,
                                        date: new Date(),
                                        types: ruta.types,
                                        viajeros:[{key:ruta.key}]
                                    }).then(function (viajeRecord) {
                                            // See the UserRecord reference doc for the contents of userRecord.
                                            console.log("Successfully created new viaje:", viajeRecord.uid);
                                            event.data.ref.update({
                                                uid: userRecord.uid
                                            });
        
                                            var ref2 = db.ref("/usuarios/"+pushId);
                                            ref2.child('viajes').push(viajeKey);
                                          
        
        
                                        })
                                        .catch(function (error) {
                                            console.log("Error creating new viaje:", error);
                                        });
                                  
                                }
                                
                                
                            });

                        }
                        
                    });






                    
                

                }
            }
        }
    
    
    
    }));
        
    
    
});


function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if (d>1) return Math.round(d);
	else if (d<=1) return Math.round(d*1000);
	return d;
}


exports.newuser = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const Url = user.photoURL;
  let ref = admin.database().ref("/usuarios").child(user.uid).set({photo: Url});
});
