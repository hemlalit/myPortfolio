// jquery to sort projects

$(document).ready(function() {
    $('.filter-button').click(function() {
        let value = $(this).attr('data-filter');
        if (value === 'all') {
            $('.project').show('1000');
        } else {
            $('.project').not('.' + value).hide('3000');
            $('.project').filter('.' + value).show('3000');
        }
    });
});

// JavaScript (Progress Bar Animation)

document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const percentage = bar.parentElement.previousElementSibling.querySelector('.percent').dataset.skill;
        bar.style.width = percentage + '%';
    });
});
