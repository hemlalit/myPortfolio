const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Notes = require('../models/notes');

// Use multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

exports.uploadNote = upload.single('file');

exports.saveNotesDetails = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File is required' });
  }

  const { title, description } = req.body;
  const note = new Notes({
    title,
    description,
    filename: req.file.filename,
    filePath: req.file.path,
  });

  try {
    await note.save();
    res.status(201).json({ message: 'Note uploaded successfully', note });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ error: 'Error uploading note' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({});
    if (notes.length === 0) {
      res.status(404).json({ message: 'No notes found' });
    } else {
      res.status(200).json({notes, message: notes.length});
    }
  } catch (error) {
    console.error('Error retrieving notes:', error);
    res.status(500).json({ error: 'An error occurred while retrieving notes' });
  }
};



exports.getFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', err);
      return res.status(404).json({ error: 'File not found' });
    }

    res.setHeader('Content-Type', 'application/pdf');
    fs.createReadStream(filePath).pipe(res);
  });
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    fs.unlink(note.filePath, async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }

      await note.deleteOne();
      res.status(200).json({ message: 'Note and associated file deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Error deleting note' });
  }
};

exports.deleteAllFiles = async (req, res) => {
  try {
    const notes = await Notes.find({});
    for (const note of notes) {
      fs.unlink(note.filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
    await Notes.deleteMany({});
    res.status(200).json({ message: 'All notes and associated files deleted successfully' });
  } catch (error) {
    console.error('Error deleting notes:', error);
    res.status(500).json({ error: 'Error deleting notes' });
  }
};
