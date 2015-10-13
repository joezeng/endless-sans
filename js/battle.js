function BattleScene() {

	SceneContext.call(this);

	// a single heart for the battle scene.
	var heart_texture = this.loadTexture("img/heart.png");
	var heart_material = new THREE.SpriteMaterial(this.heart_texture);
	
	this.heart_sprite = new THREE.Sprite(this.heart_material);
	this.heart_sprite.scale.set(16, 16, 1);
	this.heart_sprite.position.set(160, 228, 2);

	this.heart = heart;
	this.heart.sprite = this.heart_sprite;

	this.getScene().add(this.heart_sprite);

};

inherit(BattleScene, SceneContext);

BattleScene.prototype.update = function(delta) {
	this.heart.update(delta);
};
