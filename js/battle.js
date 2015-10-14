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

	this.bone_groups = [];
	this.sendNewBones(default_bone_set);

	this.elapsed_time = 0;

};

inherit(BattleScene, SceneContext);

BattleScene.prototype.update = function(delta) {
	this.heart.update(delta);
	for (var a = 0; a < this.bone_groups.length; ++a) {
		if (this.bone_groups[a].completed == true) {
			this.bone_groups.splice(a, 1);
			a -= 1;
			continue;
		}
		this.bone_groups[a].update(delta);
	}
	this.elapsed_time += delta;
	document.getElementById("time").innerHTML = this.elapsed_time.toFixed(2);
};

BattleScene.prototype.sendNewBones = function(bone_set, elapsed_time) {
	this.bone_groups.push(new BoneGroup(this, bone_set, elapsed_time));
}
