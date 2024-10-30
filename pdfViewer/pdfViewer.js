// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// Retrieve filename from URL
const urlParams = new URLSearchParams(window.location.search);
const filename = urlParams.get('filename');
const fileParts = filename.split('-');
const pdfName = fileParts[fileParts.length - 1]; // Get the last part after hyphen

// Update the PDF name in the DOM
document.getElementById('pdf-name').innerHTML = pdfName;

// Load PDF from backend
const pdfUrl = `http://localhost:5500/backend/uploads/${filename}`;

// PDF rendering variables
let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;
const scale = 1.5;
let currentScale = scale;
const canvas = document.getElementById('pdf-render');
const ctx = canvas.getContext('2d');

// Render the page
const renderPage = (num) => {
    pageIsRendering = true;
    pdfDoc.getPage(num).then(page => {
        // Set scale
        const viewport = page.getViewport({ scale: currentScale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderCtx = {
            canvasContext: ctx,
            viewport: viewport
        };
        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;
            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        });
        document.getElementById('page-num').textContent = num;
    });
};

// Check for pages rendering
const queueRenderPage = (num) => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
};

// Show previous page
const showPrevPage = () => {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
};

// Show next page
const showNextPage = () => {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
};

// Zoom in
const zoomIn = () => {
    currentScale += 0.25;
    queueRenderPage(pageNum);
};

// Zoom out
const zoomOut = () => {
    currentScale = Math.max(0.5, currentScale - 0.25);
    queueRenderPage(pageNum);
};

// Get document
pdfjsLib.getDocument(pdfUrl).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    document.getElementById('page-count').textContent = pdfDoc.numPages;
    renderPage(pageNum);
}).catch(err => {
    console.error('Error loading PDF:', err);
});

// Download button functionality
const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfName;
    link.click();
};

// Button event listeners
document.getElementById('prev-page').addEventListener('click', showPrevPage);
document.getElementById('next-page').addEventListener('click', showNextPage);
document.getElementById('zoom-in').addEventListener('click', zoomIn);
document.getElementById('zoom-out').addEventListener('click', zoomOut);
document.getElementById('downloadPdf').addEventListener('click', downloadPdf);
