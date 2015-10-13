function BattleScene() {

	SceneContext.call(this);

	// a single heart for the battle scene.
	this.heart_texture = this.loadTexture("img/heart.png");
	this.heart_sprite = new THREE.Sprite(new THREE.SpriteMaterial(this.heart_texture));
	this.heart_sprite.scale.set(16, 16, 1);
	this.heart_sprite.position.set(160, 228, 2);

	this.getScene().add(this.heart_sprite);

	this.heart = heart;
	this.heart.sprite = heart_sprite;

};

BattleScene.prototype.update = function(delta) {
	this.heart.update(delta);
};

inherit(BattleScene, SceneContext);
