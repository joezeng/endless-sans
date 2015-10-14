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

	this.vel_x = props.vel_x;

	this.scene.getScene().add(this.sprite);

}

Bone.prototype.update = function(delta) {
	this.pos_x += this.vel_x * delta;
	this.sprite.position.set(this.pos_x, this.pos_y, 3);
}

function createBonesFromBoneSet(scene, bone_set) {
	var bones = [];
	for (var a = 0; a < bone_set.length; ++a) {
		bones.push(new Bone(scene, "img/edgebone.png", {
			pos_x: bone_set[a][0],
			pos_y: bone_set[a][1],
			width: bone_set[a][2],
			height: bone_set[a][3],
			vel_x: bone_set[a][4],
		}));
	}
	return bones;
}

function BoneGroup(scene, bone_set) {

	this.scene = scene;
	this.bones = createBonesFromBoneSet(this.scene, bone_set);

}

BoneGroup.prototype.update = function(delta) {

	for (var a = 0; a < this.bones.length; ++a) {
		this.bones[a].update(delta);
	}

}


var default_bone_set = [
	[320, 168, 16, 128, -160],
	[320, 24, 16, 128, -160],
	[440, 168, 16, 128, -160],
	[440, 24, 16, 128, -160],
	[560, 168, 16, 128, -160],
	[560, 24, 16, 128, -160],
	[680, 168, 16, 128, -160],
	[680, 24, 16, 128, -160],
	[800, 168, 16, 128, -160],
	[800, 24, 16, 128, -160],
	[0, 168, 16, 128, 160],
	[0, 24, 16, 128, 160],
	[-120, 168, 16, 128, 160],
	[-120, 24, 16, 128, 160],
	[-240, 168, 16, 128, 160],
	[-240, 24, 16, 128, 160],
	[-360, 168, 16, 128, 160],
	[-360, 24, 16, 128, 160],
	[-480, 168, 16, 128, 160],
	[-480, 24, 16, 128, 160],
];
