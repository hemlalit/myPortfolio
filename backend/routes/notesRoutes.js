const express = require('express');
const { uploadNote, saveNotesDetails, getNotes, getFile, deleteNote, deleteAllFiles } = require('../controllers/notesController');
const router = express.Router();

router.post('/upload-notes', uploadNote, saveNotesDetails);
router.get('/get-notes', getNotes);
router.get('/files/:filename', getFile);  // Updated route to access files
router.delete('/deleteOne/:id', deleteNote);  // Updated route to delete note by ID
router.delete('/deleteAll', deleteAllFiles);

module.exports = router;
