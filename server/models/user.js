const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   id: { type: Number, required: true },
   username: { type: String, required: true },
   email: { type: String, required: true},
   credentials: { type: mongoose.Schema.Types.ObjectId, ref: 'Credential'}
});

module.exports = mongoose.model('User', userSchema);