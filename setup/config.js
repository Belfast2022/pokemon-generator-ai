// This method is used for analytics. Leave its body blank otherwise.
function logToAnalytics(url) {
	if (typeof url === "undefined") {
		// Log the current page
	} else {
		// Log the URL provided
	}
}

// These directories should contain sprites named by PokéDex ID
// without leading zeros (e.g. "25.gif").
define('PATH_TO_ANIMATED_SPRITES', '/sprites/animated/');
define('PATH_TO_SHINY_ANIMATED_SPRITES', '/sprites/animated/shiny/');
define('ANIMATED_SPRITE_EXTENTION', '.gif');
