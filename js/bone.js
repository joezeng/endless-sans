function Bone(scene, sprite_url, props) {

	this.scene = scene;
	this.sprite = this.scene.addSprite(sprite_url);

	// default dimensions
	this.height = props.height;
	this.width = props.width;
	this.sprite.scale.set(this.width, this.height, 1);

	this.pos_x = props.pos_x;
	this.pos_y = props.pos_y;
	this.sprite.position.set(this.pos_x, this.pos_y, 3);

	this.colour = props.colour || "white"; // can be white, blue, or orange.

	this.vel_x = props.vel_x;

	this.scene.getScene().add(this.sprite);

}

Bone.prototype.setColour = function(colour) {
	this.colour = colour;
	switch (this.colour) {
		case "white":
			this.sprite.material.color = new THREE.Color(0xffffff); break;
		case "blue":
			this.sprite.material.color = new THREE.Color(0x00ffff); break;
		case "orange":
			this.sprite.material.color = new THREE.Color(0xff7f00); break;
	}
}

Bone.prototype.update = function(delta) {
	this.pos_x += this.vel_x * delta;
	this.sprite.position.set(this.pos_x, this.pos_y, 3);
}

Bone.prototype.collidesWithHeart = function() {
	if (heart.pos_x + heart.tolerance > this.pos_x - this.width / 2 &&
	    heart.pos_x - heart.tolerance < this.pos_x + this.width / 2 &&
		heart.pos_y + heart.tolerance > this.pos_y - this.height / 2 &&
		heart.pos_y - heart.tolerance < this.pos_y + this.height / 2) {

		console.log(heart.vel_x, heart.vel_y);

		if (heart.vel_y == 0 && heart.vel_x == 0 && this.colour == "orange") {
			return true;
		} else if ((heart.vel_y != 0 || heart.vel_x != 0) && this.colour == "blue") {
			return true;
		} else if (this.colour == "white") {
			return true;
		}

	}
	return false;
}

function createBonesFromBoneSet(scene, bone_set) {
	var bones = [];
	console.log(bone_set);
	for (var a = 0; a < bone_set.length; ++a) {
		var new_bone = new Bone(scene, "img/edgebone.png", {
			pos_x: bone_set[a][0],
			pos_y: bone_set[a][1],
			width: bone_set[a][2],
			height: bone_set[a][3],
			vel_x: bone_set[a][4],
		});
		if (bone_set[a].length > 5) {
			new_bone.setColour(bone_set[a][5]);
		}
		bones.push(new_bone);
	}
	return bones;
}

function BoneGroup(scene, bone_set, elapsed_time) {

	this.scene = scene;
	this.bones = createBonesFromBoneSet(this.scene, bone_set.bones);
	this.elapsed_time = 0;

	this.next_time = bone_set.next_time;
	this.next_sent = false;

	this.delete_time = bone_set.total_time;
	this.next_bone_sets = bone_set.next_bone_sets;

	if (elapsed_time > 0){
		this.update(elapsed_time);
	}

}

BoneGroup.prototype.collidesWithHeart = function() {
	for (var a = 0; a < this.bones.length; ++a) {
		if (this.bones[a].collidesWithHeart()) {
			return true;
		}
	}
	return false;
}

BoneGroup.prototype.update = function(delta) {

	for (var a = 0; a < this.bones.length; ++a) {
		this.bones[a].update(delta);
	}
	this.elapsed_time += delta;

	if (this.elapsed_time > this.next_time && this.next_sent == false) {
		this.next_sent = true;
		this.scene.sendNewBones(bone_sets[this.next_bone_sets[Math.floor(this.next_bone_sets.length * Math.random())]], this.elapsed_time - this.next_time);
	}

	if (this.elapsed_time > this.delete_time) {
		this.clearBones();
		this.completed = true;
	}

}

BoneGroup.prototype.clearBones = function() {
	var scene = this.scene.getScene();
	for (var a = 0; a < this.bones.length; ++a) {
		scene.remove(this.bones[a].sprite);
	}
}
