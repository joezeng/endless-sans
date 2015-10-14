var keyboard = null;

keyboard = new THREEx.KeyboardState();

/*
    should we use object literals for singletons?
    or should this not be a singleton at all?  -joe

    i don't see the issue about making it a singleton, or to use object literals
    but it's likely the outcome of what to do with a press should be handled in
    the maruju object more than it should here. -az
*/

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
			heart.move("up");
        }
        if ( keyboard.eventMatches(event, 'down') ||
			 keyboard.eventMatches(event, 's')) {
            event.preventDefault();
        }
    	if ( keyboard.eventMatches(event, 'z') ||
			 keyboard.eventMatches(event, 'space') ||
	 		 keyboard.eventMatches(event, 'enter')) {
      		event.preventDefault();
			// advance text in _some_ circumstances?
    	}
		if ( keyboard.eventMatches(event, 'x')) {
			event.preventDefault();
		}
    },

	handleReleaseInput: function(event) {
		if ( keyboard.eventMatches(event, 'z') ||
	 		 keyboard.eventMatches(event, 'x') ||
	 	     keyboard.eventMatches(event, 'space') ) {
			// event.preventDefault();
			textbox.deaccelerateText();
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
