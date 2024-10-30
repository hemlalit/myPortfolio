// jq for contact form 

document.querySelector('#contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    let formData = new FormData(this);
    
    fetch('contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        
        if (data.status === 'success') {
            alert(data.message);
            this.reset();
        } else {
            console.log("msg didnt send")
        }
    })
    .catch(error => console.log('Error:', error));
});