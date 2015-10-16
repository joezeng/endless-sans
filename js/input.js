var keyboard = null;

keyboard = new THREEx.KeyboardState();

var InputManager = {

    handlePressInput: function(event) {
		// only handle input when no other DOM element has focus.
		if (document.activeElement != document.body) return;

        if (event.repeat) {
			event.preventDefault();
            return;
        }
        if ( keyboard.eventMatches(event, 'left') ||
			 keyboard.eventMatches(event, 'a')) {
            event.preventDefault();
			heart.move("left");
        }
        if ( keyboard.eventMatches(event, 'right') ||
			 keyboard.eventMatches(event, 'd')) {
            event.preventDefault();
			heart.move("right");
        }
        if ( keyboard.eventMatches(event, 'up') ||
			 keyboard.eventMatches(event, 'w')) {
            event.preventDefault();
			if (maruju.rootScene.play_state == "select-menu"){
				menu.moveUp();
			} else {
				heart.move("up");
			}
        }
        if ( keyboard.eventMatches(event, 'down') ||
			 keyboard.eventMatches(event, 's')) {
            event.preventDefault();
			if (maruju.rootScene.play_state == "select-menu"){
				menu.moveDown();
			}
        }
    	if ( keyboard.eventMatches(event, 'z') ||
			 keyboard.eventMatches(event, 'space') ||
	 		 keyboard.eventMatches(event, 'enter')) {
      		event.preventDefault();
			if (maruju.rootScene.play_state == "select-menu"){
				menu.select();
			} else {
				sans.advanceTextA();
			}
    	}
		if ( keyboard.eventMatches(event, 'x')) {
			event.preventDefault();
			sans.advanceTextB();
		}
    },

	handleReleaseInput: function(event) {
		if ( keyboard.eventMatches(event, 'z') ||
	 		 keyboard.eventMatches(event, 'x') ||
	 	     keyboard.eventMatches(event, 'space') ) {
			event.preventDefault();
		}
		if ( keyboard.eventMatches(event, 'left') ||
			 keyboard.eventMatches(event, 'a')) {
            event.preventDefault();
			heart.move("clear_h");
        }
        if ( keyboard.eventMatches(event, 'right') ||
			 keyboard.eventMatches(event, 'd')) {
            event.preventDefault();
			heart.move("clear_h");
        }
        if ( keyboard.eventMatches(event, 'up') ||
			 keyboard.eventMatches(event, 'w')) {
            event.preventDefault();
			heart.move("clear_v");
        }
        if ( keyboard.eventMatches(event, 'down') ||
			 keyboard.eventMatches(event, 's')) {
            event.preventDefault();
        }
	},

	injectInto: function(domElement) {
		domElement.addEventListener('keydown', InputManager.handlePressInput);
		domElement.addEventListener('keyup', InputManager.handleReleaseInput);
	},

};

InputManager.injectInto(document);


function reset_game(difficulty) {
	maruju.rootScene.resetGame(difficulty);
	sans.queueText([
		"Alright, here we go."
	]);
}
