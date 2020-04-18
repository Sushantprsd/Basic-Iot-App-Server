const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BulbSchema = new Schema({
   currentState: {
      type: Number,
      required: true
   },
   time:
   {
      type: Date,
      default: Date.now
   }
})

module.exports = mongoose.model('BulbState', BulbSchema)