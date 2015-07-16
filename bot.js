/*
 * File : bot.js
 * Author : Shashank Chhikara <shanky061@gmail.com>
 *
 * Runs everytime we open extension popup.
 */

/* Function : download_video
 * Description :
 * 		Download Video of given quality by redirecting current tab to it's URL.
 *
 * NOTE :
 *		Redirection from extension is not allowed, that's why this callback is used.
 */
function download_video() {
	// Redirect current tab to download URL 
	chrome.tabs.executeScript({
		code: 'window.location = "' + this.href + '"'
	});
}


/* Event : DOMContentLoaded
 * 
 * Description :
 * 		Fired when the initial HTML document has been completely loaded and parsed,
 * 		without waiting for external files.
 */
document.addEventListener('DOMContentLoaded', function() {

	// Set up xhr for AJAX call
	var xhr = new XMLHttpRequest();

	// Set up callback for our AJAX call
	xhr.onreadystatechange = function() {

		// If AJAX call succeed
		if (xhr.readyState == 4) {

			// Hide loading image
			document.querySelector('#loading-img').style.display = 'none';

			try {
				var resp = JSON.parse(xhr.responseText);
			} catch(e) {
				// If returned data is not in JSON
				console.log('Data Received is not in JSON format.\n', xhr.responseText);

				// Show error and prompt to try again.
				var p = document.createElement('p');
				p.setAttribute('class', 'error');
				p.innerHTML = '<b>Error</b> : ' + xhr.responseText;
				var tryagain = document.createElement('a');
				tryagain.setAttribute('role', 'button');
				tryagain.addEventListener('click', function() {
					location.reload();
				}, false);
				tryagain.innerText = 'Try Again';
				document.querySelector('div.center').appendChild(p);
				document.querySelector('div.center').appendChild(tryagain);
				return false;
			}

			// If app succeed in getting data
			if (resp.Status == 'OK') {
				// formats : a container to hold our download links
				var formats = document.createElement('div');
				formats.setAttribute('class', 'formats');
				// Add links in formats container
				resp.Data.every(function(format) {
					var dButton = document.createElement('a');
					dButton.setAttribute('role', 'button');
					dButton.href = format.URL;
					dButton.addEventListener('click', download_video, false);
					dButton.innerHTML = format.quality + '<br><b><small>' + format.format + '</small></b>';
					formats.appendChild(dButton);
					return true;
				});
				// Finally add formats container to our document
				document.querySelector('div.center').appendChild(formats);
			} else {

				// Show error and prompt to try again.
				var p = document.createElement('p');
				p.innerHTML = 'Error : ' + resp.Description;
				var tryagain = document.createElement('a');
				tryagain.setAttribute('role', 'button');
				tryagain.addEventListener('click', function() {
					location.reload();
				}, false);
				tryagain.innerText = 'Try Again';
				document.querySelector('div.center').appendChild(p);
				document.querySelector('div.center').appendChild(tryagain);
			}
		}
		// TODO : add callback in case of AJAX call failed
	}

	// Receive videoId from page source
	chrome.tabs.executeScript({
		code: 'document.querySelector(\'meta[itemprop="videoId"]\').getAttribute("content")'
	}, function(result) {
		videoId = result[0];
		// appURL : URL of app, which sends download data
		// NOTE : sets it after we successfully received videoId
		var appURL = "http://localhost:8080/getvideo.php?videoid=" + videoId + "&type=json";

		xhr.open("GET", appURL, true);
		// Send our AJAX call
		xhr.send();
		console.log('videoId is ' + videoId);
	});
});
