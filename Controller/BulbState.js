const awsIot = require('aws-iot-device-sdk')
const BulbState = require("../model/BulbCurrentStatus")
require('dotenv').config()


const device = awsIot.device({
   keyPath: "Certificate/d68217057c-private.pem.key",
   certPath: "Certificate/d68217057c-certificate.pem.crt",
   caPath: "Certificate/dCA.pem",
   clientId: "Team Dev",
   host: process.env.HOST
})

device.on('connect', function () {
   console.log('connect');
   device.subscribe('test/led/1');
});

// device
//   .on('message', function(topic, payload) {
//     console.log('message', topic, payload.toString());
//   });

exports.getBulbControls = (req, res, next) => {

   // device.on('message', function (topic, payload) {
   //    console.log('message on ', topic, payload.toString());
   //    currentState = payload.toString()
   // });
   // device.publish('test/led/1', JSON.stringify(0));


   BulbState.find()
      .then(result => {
         console.log(result[0].currentState)
         if (!result) {
            return 0
         } else {
            device.publish('test/led/1/success', JSON.stringify(result[0].currentState));
            return result[0].currentState
         }

      })
      .then(state => {
         res.status(200).json({
            "CurrentState": state
         })
      })
      .catch(err => {
         console.log(err)
      })
}

exports.postBulbControls = (req, res, next) => {
   const value = req.body.value;

   let currentState = "OFF"

   if (JSON.stringify(value) === "1") {
      currentState = "ON"
   }

   device.publish('test/led/1', JSON.stringify(value));


   BulbState.find()
      .then(result => {
         if (!result) {
            console.log("no result")
            const newState = new BulbState({
               currentState: value,
            })
            return newState.save()
         } else {
            result[0].currentState = value
            return result[0].save();
         }

      })
      .catch(err => {
         console.log(err)
      })
   res.status(201).json({
      "value": value,
      "CurrentState": currentState
   })
}
