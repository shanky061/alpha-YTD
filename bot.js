// Download Video in Given Quality
function download(quality) {
	quality.innerHTML = '<img src="images/init.png" width="250" height="45">';
}

document.addEventListener('DOMContentLoaded', function() {

	var low_q = document.getElementById('240p');
	var mid_q = document.getElementById('360p');
	var hd_q = document.getElementById('720p');
	var fullhd_q = document.getElementById('1080p');

	// Download in low Quality 240p
	low_q.addEventListener('click', function() {
		download(this);
	});
	// Download in mid Quality 360p
	mid_q.addEventListener('click', function() {
		download(this);
	});
	// Download in hd Quality 720p
	hd_q.addEventListener('click', function() {
		download(this);
	});
	// Download in full hd Quality 1080p
	fullhd_q.addEventListener('click', function() {
		download(this);
	});
});
