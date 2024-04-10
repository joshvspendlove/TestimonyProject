const mongoose = require('mongoose');

const credentialSchema = mongoose.Schema({
   hash_pass: { type: String, required: true },
   salt: { type: String, required: true },
});

module.exports = mongoose.model('Credential', credentialSchema);