<?php
// Simulating blog posts data

$page = isset($_GET['page']) ? $_GET['page'] : 1;
$postsPerPage = 2;
$blogPosts = [
    [
        "title" => "Learning React",
        "image" => "blog3.jpg",
        "excerpt" => "A journey into building user interfaces using React, and how it helped me...",
        "link" => "blog3.html"
    ],
    [
        "title" => "Mastering CSS Grid",
        "image" => "blog4.jpg",
        "excerpt" => "In this post, we dive deep into CSS Grid and how it simplifies modern layouts...",
        "link" => "blog4.html"
    ],
    // You can add more blog posts here
];

// Calculate which posts to send
$start = ($page - 1) * $postsPerPage;
$end = $start + $postsPerPage;
$selectedPosts = array_slice($blogPosts, $start, $postsPerPage);

// Output the HTML for each blog post
foreach ($selectedPosts as $post) {
    echo '<div class="blog-card">';
    echo '<img src="'.$post['image'].'" alt="'.$post['title'].'" class="blog-image">';
    echo '<h2>'.$post['title'].'</h2>';
    echo '<p>'.$post['excerpt'].'</p>';
    echo '<a href="'.$post['link'].'" class="read-more">Read More</a>';
    echo '</div>';
}



