
// js to toggle slidebar

document.querySelector('.cross').style.display = 'none';

document.querySelector('.icon').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('sideGo');
    document.querySelector('.main').classList.toggle('contentShift');
    if (document.querySelector('.sidebar').classList.contains('sideGo')) {
        document.querySelector('.ham').style.display = 'inline';
        document.querySelector('.cross').style.display = 'none';
    } else {
        document.querySelector('.ham').style.display = 'none';
        setTimeout(() => {
            document.querySelector('.cross').style.display = 'inline';
        }, 300);
    }

});

if (document.querySelector('.sidebar').classList.contains('sideGo')) {
    document.querySelector('.ham').style.display = 'inline';
    document.querySelector('.cross').style.display = 'none';
} else {
    document.querySelector('.ham').style.display = 'none';
    setTimeout(() => {
        document.querySelector('.cross').style.display = 'inline';
    }, 300);
}

// js for typing name

document.addEventListener("DOMContentLoaded", function () {
    const text = "Hemlalit Mali.";
    let index = 0;

    function type() {
        var typingElement = document.getElementById("typing");
        if (typingElement) {

            if (index < text.length) {
                typingElement.innerHTML = text.slice(0, index + 1);
                index++;
                setTimeout(type, 400);  // Adjust typing speed here (150ms)
            } else {
                typingElement.innerHTML = text;  // After typing, remove the cursor
            }
        }
    }

    type()

});

// Testimonials Carousel

$(document).ready(function () {
    let currentIndex = 0;
    let items = $('.testimonial-item');
    let itemAmt = items.length;

    function cycleItems() {
        let item = $('.testimonial-item').eq(currentIndex);
        items.hide();
        item.css('display', 'inline-block');
    }

    $('.next').click(function () {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    $('.prev').click(function () {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });
});


// dark mode with local storage

$(document).ready(function () {
    const body = $('body')
    $('#darkModeToggle').click(function () {
        body.toggleClass('dark-mode')

        if (body.hasClass('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    })

    // Load the mode from localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        $('body').addClass('dark-mode');
        $('.toggle-checkbox:checked+.toggle-label .toggle-ball').css("transform", "translateX(30px);")

    }

})



// Fetch Visitor Count

// fetch('counter.php')
//     .then(response => response.json())
//     .then(data => {
//         document.querySelector('#visitCount').innerHTML = 'Visitors: ' + data.visits;
//     });


// $(document).ready(function () {
//     function fetchVisitorCount() {
//         $.ajax({
//             url: '/visitor_count.php', // API that returns visitor count
//             success: function (response) {
//                 $('#visitorCount').text('Visitors Online: ' + response);
//             }
//         });
//     }

//     setInterval(fetchVisitorCount, 5000); // Update count every 5 seconds
// });

// Animated Progress Bars

$(document).ready(function () {
    $(window).on('scroll', function () {
        $('.progress-bar').each(function () {
            var skillLevel = $(this).attr('data-skill');
            $(this).css('width', skillLevel);
        });
    });
});
