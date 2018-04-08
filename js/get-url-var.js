$(function() {
	if (window.location.search.includes("bsta.rs")) {
		var $newUrl = "http://" + window.location.search.substr(1);
		$("iframe").attr("src", $newUrl);
	}
});