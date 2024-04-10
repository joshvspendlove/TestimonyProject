const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxTestimonyId: { type: Number, required: true },
   maxUserId: { type: Number, required: true },

});

module.exports = mongoose.model('Sequence', sequenceSchema);