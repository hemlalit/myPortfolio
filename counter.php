<?php
$counter_file = 'counter.txt';

// Read and update counter
if (!file_exists($counter_file)) {
    file_put_contents($counter_file, 0);
}
$counter = file_get_contents($counter_file);
$counter++;
file_put_contents($counter_file, $counter);

echo json_encode(['visits' => $counter]);

