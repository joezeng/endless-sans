function BattleScene() {

	SceneContext.call(this);

	// a single heart for the battle scene.
	this.heart_sprite = this.addSprite("img/blueheart.png");
	this.heart_sprite.scale.set(16, 16, 1);
	this.heart_sprite.position.set(160, 228, 2);

	this.heart = heart;
	this.heart.sprite = this.heart_sprite;

	this.camera.position.set(0, 0, 10);

	this.getScene().add(this.heart_sprite);

	this.difficulty = "easy";
	this.bone_groups = [];

	this.play_state = "none";
	this.play_speed = 1;

	this.elapsed_time = 0;
	this.final_time = 0;

};

inherit(BattleScene, SceneContext);

BattleScene.prototype.update = function(delta) {

	if (this.play_state == "playing") {

		var collided = false;

		this.heart.update(delta * this.play_speed);
		for (var a = 0; a < this.bone_groups.length; ++a) {
			if (this.bone_groups[a].completed == true) {
				this.bone_groups.splice(a, 1);
				a -= 1;
				continue;
			}
			this.bone_groups[a].update(delta * this.play_speed);
			if (this.bone_groups[a].collidesWithHeart()) {
				collided = true;
			}
		}

		if (collided == true) {
			if (this.difficulty == "easy") {
				heart.hp = Math.max(0, heart.hp - delta);
				document.getElementById("hp").innerHTML = heart.hp.toFixed(2);
			} else {
				heart.hp = 0;
				document.getElementById("hp").innerHTML = "0";
			}
		}

		if (heart.hp <= 0) {
			this.final_time = this.elapsed_time;
			this.elapsed_time = 0;
			this.play_state = "gameover";
			console.log("Game over!");
			document.getElementById("time").innerHTML = this.final_time.toFixed(2);
		} else {
			this.elapsed_time += delta;
			document.getElementById("time").innerHTML = this.elapsed_time.toFixed(2);
		}


	} else if (this.play_state == "gameover") {

		this.elapsed_time += delta;

		this.heart.updateGameover(this.elapsed_time);

		if (this.elapsed_time >= 1.0) {
			this.elapsed_time = 0;
			this.play_state = "not-playing";
		}

	}

};

BattleScene.prototype.sendNewBones = function(bone_set, elapsed_time) {
	this.bone_groups.push(new BoneGroup(this, bone_set, elapsed_time));
};

BattleScene.prototype.clearAllBones = function() {
	for (var a = 0; a < this.bone_groups.length; ++a) {
		this.bone_groups[a].clearBones();
	}
};

BattleScene.prototype.resetGame = function(diff_level) {
	this.clearAllBones();
	this.difficulty = diff_level;
	this.heart.hp = 1;
	this.heart.pos_x = 160;
	this.heart.pos_y = 112;
	this.elapsed_time = 0;
	document.getElementById("hp").innerHTML = "1";
	this.play_state = "playing";
	this.bone_groups = [];
	this.sendNewBones(default_bone_set);
	switch (diff_level) {
		case "easy":
			heart.tolerance = 0;
			this.play_speed = 1;
			break;
		case "medium":
			heart.tolerance = 2;
			this.play_speed = 1;
			break;
		case "hard":
			heart.tolerance = 2;
			this.play_speed = 1.5;
			break;
	}
	document.activeElement.blur();
}
