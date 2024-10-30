import { baseUrl } from '../constants/constants.js';

document.addEventListener("DOMContentLoaded", function () {
  const notesContainer = document.querySelector(".notes-container");
  const responseMessage = document.getElementById('responseMessage');
  const errMessage = document.getElementById('errMessage');

  const deleteBtn = document.getElementById('deleteAllBtn')

  async function fetchNotes() {
    try {
      const response = await fetch(`${baseUrl}/notes/get-notes`);
      const data = await response.json();
  
      if (!response.ok) {
        if (data.message === 'No notes found') {
          errMessage.innerText = 'No notes found';
          deleteBtn.style.display = 'none'; // Ensure deleteBtn is defined and accessible
        } else {
          errMessage.innerText = `Error: ${data.error}`;
        }
        return;
      }

      if(data.message <= 1){
        deleteBtn.style.display = 'none';
      }
  
      notesContainer.innerHTML = ""; // Clear notes container before appending
      data.notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        noteCard.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.description}</p>
          <a href="../pdfViewer/pdfViewer.html?filename=/${note.filename}" target="_blank">View PDF</a>
          <button class='delete-btn' onclick="deleteNoteHandler('${note._id}')">Delete</button>
        `;
        notesContainer.appendChild(noteCard);
      });
  
      responseMessage.innerText = 'Notes fetched successfully!';
      setTimeout(() => {
        responseMessage.innerText = '';
      }, 5000);
    } catch (error) {
      console.error("Error fetching notes:", error);
      errMessage.innerText = 'Error fetching notes';
    }
  }
  

  window.deleteNoteHandler = async function (noteId) {
    try {
      const response = await fetch(`${baseUrl}/notes/deleteOne/${noteId}`, { method: 'DELETE' });
      if (response.ok) {
        responseMessage.innerText = 'Note deleted successfully!';
        fetchNotes(); // Reload the notes list
      } else {
        const result = await response.json();
        errMessage.innerText = `Error: ${result.error}`;
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      errMessage.innerText = 'An error occurred during deletion.';
    }
  };


  async function deleteAllNotes() {
    try {
      const response = await fetch(`${baseUrl}/notes/deleteAll`, { method: 'DELETE' });
      if (response.ok) {
        responseMessage.innerText = 'All notes deleted successfully';
        notesContainer.innerHTML = '';
      } else {
        errMessage.innerText = 'Failed to delete all notes';
      }
    } catch (error) {
      console.error('Error deleting all notes:', error);
    }
  }

  document.getElementById('customForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('file', document.getElementById('file').files[0]);

    try {
      const response = await fetch(`${baseUrl}/notes/upload-notes`, {
        method: 'POST',
        body: formData
      });
      

      const result = await response.json();
      if (response.ok) {
        responseMessage.innerText = 'Note uploaded successfully!';
        setTimeout(() => {
          fetchNotes();
        }, 5000);
      } else {
        errMessage.innerText = `Error: ${result.error}`;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      errMessage.innerText = 'An error occurred during upload.';
    }
  });

  deleteBtn.addEventListener('click', deleteAllNotes);
  fetchNotes();

});
