const awsIot = require('aws-iot-device-sdk')

const device = awsIot.device({
   keyPath: "Certificate/d68217057c-private.pem.key",
   certPath: "Certificate/d68217057c-certificate.pem.crt",
   caPath: "Certificate/dCA.pem",
   clientId: "Team Dev",
   host: "a1ylf3jsh08lcu-ats.iot.us-east-1.amazonaws.com"
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
   let currentState = 0
   device.on('message', function (topic, payload) {
         console.log('message on ', topic, payload.toString());
         currentState = payload.toString()
      });
   res.status(200).json({
      "Current State": currentState
   })
}

exports.postBulbControls = (req, res, next) => {
   const value = req.body.value;
   console.log(value)
   let currentState = "OFF"
   if(JSON.stringify(value) === "1"){
      currentState = "ON"
   }
   device.publish('test/led/1', JSON.stringify(value));
   res.status(201).json({
      "value":value,
      "Current State": currentState
   })
}
