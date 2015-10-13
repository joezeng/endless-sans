// Yeah, no way we're writing this every time we're inheriting. -az
var inherit = function (child, parent) {
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
}

function requestGET(url, callback, async) {
	var req = new XMLHttpRequest();
	req.open("GET", url, async ? async : false);
	req.onreadystatechange = function() {
		if (this.readyState == this.DONE && this.status == 200)
			callback(this.responseText);
		else if (this.readyState == this.DONE && this.status == 404)
			callback(null);
	}
	req.send();
}

var smoothStep = function(l) {
	return Math.pow(l, 2) * (3 - 2 * l);
}

var easeIn = function(l, o) {
	o = o || 2;
	return Math.pow(l, o);
}

var easeOut = function(l, o) {
	o = o || 2;
	return 1 - Math.pow(1 - l, o);
}

var lerp = function (s, e, l) {
	return (e - s) * l + s;
}

var clamp = function(val, min, max) {
	return Math.min(max, Math.max(val, min));
}

