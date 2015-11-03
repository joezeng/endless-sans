function Sans() {

	this.text_queue = [];
	this.current_text = "";
	this.text_chars = 0;
	this.prev_text_chars = 0;

	this.text_state = "none";

	this.cps = 25;

}

Sans.prototype.queueText = function(queue) {
	this.showSpeechBubble();
	this.text_queue = this.text_queue.concat(queue);
	this.text_state = "showing_textbox";
	setTimeout(function(self){
		return function(){
			self.text_state = "none";
			self.current_text = self.text_queue.shift();
		}
	}(this), 500);
};

Sans.prototype.advanceTextA = function() {
	if (this.text_state != "showing_textbox" && this.text_chars >= this.current_text.length) {
		this.text_chars = 0;
		if (this.text_queue.length > 0) {
			this.current_text = this.text_queue.shift();
		} else {
			document.getElementById("speech_bubble").innerHTML = "";
			this.current_text = "";
			this.hideSpeechBubble();
			if (maruju.rootScene.play_state == "intro"){
				maruju.rootScene.play_state = "select-menu";
	 			document.getElementById("select_difficulty").className = "";
			} else if (maruju.rootScene.play_state == "preplaying"){
				maruju.rootScene.play_state = "playing";
			} else if (maruju.rootScene.play_state == "gameover" ||
					   maruju.rootScene.play_state == "not-playing"){
		   		maruju.rootScene.play_state = "select-menu";
				document.getElementById("select_difficulty").className = "";
				document.getElementById("gameplay_area").className = "closed";
			}
		}
	}
};

Sans.prototype.advanceTextB = function() {
	this.text_chars = this.current_text.length;
	document.getElementById("speech_bubble").innerHTML = this.current_text;
};

Sans.prototype.showSpeechBubble = function() {
	document.getElementById("speech_bubble").className = "";
};

Sans.prototype.hideSpeechBubble = function() {
	document.getElementById("speech_bubble").className = "closed";
};

Sans.prototype.update = function(delta) {
	if (this.text_chars == this.current_text.length) {}
	else {
		this.text_chars = Math.min(this.current_text.length, this.text_chars + this.cps * delta);
		document.getElementById("speech_bubble").innerHTML =
			this.current_text.substr(0, Math.floor(this.text_chars));

		if (Math.floor(this.text_chars / 2) > Math.floor(this.prev_text_chars / 2)) {
			document.getElementById("se_sans").currentTime = 0;
			document.getElementById("se_sans").play();
		}
		this.prev_text_chars = this.text_chars;
	}
};

var sans = new Sans();



Sans.prototype.sendGameOverMessage = function() {
	var game = maruju.rootScene;
	if (game.difficulty == "easy" && game.final_time < 5) {
		this.queueText([
			"Hey, were you <i>trying</i> to lose there? That took some effort!",
		]);
	} else if (game.difficulty == "easy" && game.final_time >= 60) {
		this.queueText([
			"Alright, so you've learned the ropes of the game.",
			"Now try playing with only one hit point.",
		]);
	} else if (game.difficulty == "medium" && game.final_time >= 60 &&
			   game.final_time < 180) {
		this.queueText([
			"Pretty good. Bet you can't do better.",
		]);
	} else if (game.difficulty == "medium" && game.final_time >= 180) {
		this.queueText([
			"I... obviously underestimated you. You should try having a REALLY hard time.",
		]);
	} else if (game.difficulty == "hard" && game.final_time >= 60) {
		this.queueText([
			"You... are a LUNATIC.",
			"I am praying for the residents of Mt. Ebott right now, if this is what they're up against.",
		]);
	} else {
		this.queueText([
			"Ooh, too bad! Better luck next time.",
			"Or, on second thought, don't play again. I don't want to lose to you when it counts.",
		]);
	}
};
