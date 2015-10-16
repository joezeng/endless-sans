function Menu(){

	this.current_option = 0;
	this.options = [
		"easy",
		"medium",
		"hard"
	];

}

Menu.prototype.moveUp = function() {
	this.current_option -= 1;
	if (this.current_option < 0){
		this.current_option += this.options.length;
	}
	this.updateHeartPosition();
}

Menu.prototype.moveDown = function() {
	this.current_option += 1;
	if (this.current_option >= this.options.length){
		this.current_option -= this.options.length;
	}
	this.updateHeartPosition();
}

Menu.prototype.select = function() {
	reset_game(this.options[this.current_option]);
}

Menu.prototype.updateHeartPosition = function(pos) {
	for (var a = 0; a < this.options.length; ++a) {
		if (a == this.current_option) {
			document.getElementById("option" + a).className = "sel diff-option";
		} else {
			document.getElementById("option" + a).className = "diff-option";
		}
	}
}

var menu = new Menu();
