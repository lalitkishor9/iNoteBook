const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title:{
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description:{
    type: String,
    required: true,
  },
  tag:{
    type: String,
    default: "General",
    trim: true,
    maxlength: 32
  },
  pinned:{
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Notes', NotesSchema);
