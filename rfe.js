// Responsive Flickr Web Embed
//
// This grabs all of the Flickr iframes in the page, adds max-width: 100% so they
// don't break out of their parent container, then updates the iframe height based
// on the original width/height values to maintain aspect ratio.

(function() {
	// Grab all Flickr Web Embeds.
	var frames = Array.prototype.slice.call(document.querySelectorAll("iframe[src*='//www.flickr.com/photos/']"));
	var divisor;
	var setHeight;
	var resizeTimer;

	function resizeFrames(event){
		frames.forEach(function(frame, index, array){
			// Add maxwidth to the iframe, so it will not break out of it's container.
			if (getComputedStyle(frame,null).getPropertyValue("max-width") == "none") {
				frame.style.maxWidth = "100%";
			}

			// Set initial lastWidth if it's not set and offsetWidth is frame.width.
			if (!frame.dataset.lastWidth && frame.offsetWidth == frame.width) {
				frame.dataset.lastWidth = frame.offsetWidth;
			}

			// If the width has changed, recalculate and set the height.
			if (frame.dataset.lastWidth != frame.offsetWidth) {
				divisor = frame.width/frame.offsetWidth;
				setHeight = frame.offsetHeight/divisor;

				frame.style.height = setHeight + "px";
				frame.dataset.lastWidth = frame.offsetWidth;
			}
		});
	}

	if (frames) {
		window.addEventListener('resize', function(){
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(resizeFrames, 250);
		}, false);

		resizeFrames();
	}
})();