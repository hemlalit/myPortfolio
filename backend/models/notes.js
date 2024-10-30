const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },  // Store file path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notes', NoteSchema);
