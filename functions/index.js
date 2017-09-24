const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyCb-zSaO_XizGF7fgnsBeLX5-MeRvVMagw"
});

exports.crearViaje = functions.database
  .ref("/usuarios/{pushId}/rutas")
  .onWrite(event => {
    const rutas = event.data.val();
    const user = event.params.pushId;
    console.log("Crear viaje Usuario "+user);
    console.log(rutas);

    var keys = Object.keys(rutas);
    console.log(keys);
    keys.forEach(function(key) {
      console.log(key);
      var ruta = rutas[key];

      if (event.data.exists() && event.data.previous.exists()) {
        console.log("Updated executed");
        if (ruta.estado == 2) {
          console.log("Ruta estado 2");
          if (event.data.previous.val()[key].estado == 1) {
            console.log("Ruta estado previo 1. Validando matches ");

            //First we check if exist a travel that match my conditions
            var db = admin.database();
            var ref = db.ref("/viajes");

            ref.on("value", snap => {
              let viajes = snap.val();

              console.log(snap);
              var cont = 0;
              if (viajes == null || viajes.length == 0) {
                console.log("No existen viajes, creatndo nuevo");
                //No matches, we have to create a new one
                let viajeKey = ref.push().key;
                var createViaje=ref
                  .child(viajeKey)
                  .set({
                    key: viajeKey,
                    end: ruta.end,
                    init: ruta.init,
                    nombre: ruta.key,
                    date: "" + new Date().getTime(),
                    types: ruta.types,
                    viajeros: [{ rutaKey: ruta.key,userKey:user }]
                  });

                  
                  
              } else {
                var itemsProcessed = 0;
                var viajeCreado = false;
                snap.forEach(via => {
                  let viaje = via.val();

                  console.log(viaje);
                  var distance1 = distance(
                    viaje.init.lat,
                    viaje.init.long,
                    ruta.init.lat,
                    ruta.init.long
                  );
                  var distance2 = distance(
                    viaje.end.lat,
                    viaje.end.long,
                    ruta.end.lat,
                    ruta.end.long
                  );
                  console.log(distance1 + " d1");
                  console.log(distance2 + " d2");

                  //Validate by range
                  if (!viajeCreado && distance1 < 1 && distance2 < 1) {
                    //Im a kilomether near to the viaje
                    //Add me to the current viaje
                    console.log("Hizo match con una ruta");

                    

                      var newChildRef = ref.child(viaje.key).child("viajeros").push();
                      
                      // now it is appended at the end of data at the server
                      newChildRef.set({ rutaKey: ruta.key,userKey:user });

                    console.log("Event pushId" + user);
                    viajeCreado = true;
                   

                    
                    
                  }

                  itemsProcessed++;

                  console.log("Items" + itemsProcessed);
                  console.log("Num of children" + viajes.length);
                  if (!viajeCreado && itemsProcessed === viajes.length) {
                    console.log("No matches viajes, creatndo nuevo");
                    //No matches, we have to create a new one
                    let viajeKey = ref.push().key;
                    ref
                      .child(viajeKey)
                      .set({
                        key: viajeKey,
                        end: ruta.end,
                        init: ruta.init,
                        nombre: ruta.key,
                        date: new Date(),
                        types: ruta.types,
                        viajeros: [{ rutaKey: ruta.key,userKey:user }]
                      })
                      .then(function(viajeRecord) {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log(
                          "Successfully created new viaje:",
                          viajeRecord.uid
                        );
                        event.data.ref.update({
                          uid: userRecord.uid
                        });

                        
                          
                      })
                      .catch(function(error) {
                        console.log("Error creating new viaje:", error);
                      });
                  }
                });
              }
            });
          }
        }
      }
    });
  });

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2 - lat1) * Math.PI / 180;
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if (d > 1) return Math.round(d);
  else if (d <= 1) return Math.round(d * 1000);
  return d;
}

exports.newuser = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.
  const Url = user.photoURL;
  const name = user.displayName;
  let ref = admin
    .database()
    .ref("/usuarios/" + user.uid)
    .set({ photo: Url, nombre: name });
});



exports.crearViajeUsuario = functions.database
.ref("/viajes/{pushId}")
.onWrite(event => {
    const viaje = event.data.val();  
    const viajeKey=event.params.pushId;
    console.log("Viajes");
    console.log(viaje);
    if(viaje.viajeros){

        var keys = Object.keys(viaje.viajeros);
        console.log(keys);
        keys.forEach(function(key) {

            var viajero=viaje.viajeros[key];
            console.log(viajero);
            //First we check if exist a travel that match my conditions
            var db = admin.database();
            var refViaje = db.ref("/usuarios/" + viajero.userKey+'/rutas/'+viajero.rutaKey);

            return refViaje.child('viajes')
            .push({
                   viajeKey: viajeKey,
                   viajeros:keys.length
            });
            
            /*refViaje.on("value", snap => {
                let viajes = snap.val();
                yaExiste=false;
                var contador=0;
                snap.forEach(via => {
                    let viaje = via.val();
                    console.log(viaje);
                    if(viaje.viajeKey==viajeKey){
                        yaExiste=true;
                        //Update
                        return viaje.update({
                               
                               viajeros:keys.length
                        });

                    }
                    contador++;
                    console.log("Snap length"+snap.numChildren());
                    console.log(snap);
                    if(!yaExiste&&contador==snap.numChildren()){
                        return refViaje.child('viajes')
                        .push({
                               viajeKey: viajeKey,
                               viajeros:keys.length
                        });
                    }

                });


            });*/
            
            
        });
    }
    

});