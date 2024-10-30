$(document).ready(function () {
    let page = 1; // Track the page or batch of blogs
    const loadMoreButton = $('.load-more-btn');

    // Event listener for Load More button
    loadMoreButton.on('click', function () {
        $.ajax({
            url: 'load-blogs.php',
            type: 'GET',
            data: { page: page },
            success: function (data) {
                $('#blog-posts').append(data);
                page++; // Increment page for the next load
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + error);
            }
        });
    });
});


