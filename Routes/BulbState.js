const route = require('express').Router();
const BulbStateController = require('../Controller/BulbState')


route.get('/control',BulbStateController.getBulbControls)
route.post('/control',BulbStateController.postBulbControls)


module.exports = route