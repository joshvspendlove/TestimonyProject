const mongoose = require('mongoose');

const testimonySchema = mongoose.Schema({
   id: { type: Number, required: true },
   title: { type: String, required: true },
   body: { type: String, required: true },
   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   posted_time: { type: Date, required: true},
   updated_time: { type: Date  },
   is_private: { type: Boolean, required: true },
   is_anonymous: { type: Boolean, required: true }
});

module.exports = mongoose.model('Testimony', testimonySchema);