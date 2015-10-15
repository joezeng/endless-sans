// A node structure. If we want some sort of object inheritance structure (which we probably will)
var Node = function (content) {
	this.content = content;
	this._children = [];
	this._parent = null;
};

Node.prototype = {
	constructor: Node,
	update: function () {},
	recursiveUpdate: function (delta) {
		for(var child in this._children) {
			this._children[child].update(delta);
			this._children[child].recursiveUpdate(delta);
		}
	},
	addChild: function (child) {
		this._children.push(child);
		child._parent = this;
		return child;
	}
};

// Set up a scene's context.
var SceneContext = function() {};

SceneContext.prototype = {
	constructor: SceneContext,
	_update:function(delta) {
		if (this.child) this.child._update(delta);
		else this.update(delta);
	},
	getScene:function() {
		if (!this.child)
			return this.renderScene;
		else
			return this.child.getScene();
	},
	getCamera:function() {
		if (!this.child)
			return this.camera;
		else
			return this.child.getCamera();
	},
	addSprite:function(file) {
		var tex = this.loadTexture(file);
		var mat = new THREE.SpriteMaterial({map: tex, color: 0xffffff});
		var spr = new THREE.Sprite(mat);
		this.getScene().add(spr);
		return spr;
	},
	addNode:function(node) {
		if (node instanceof Node)
			this.root.addChild(node);
		else
			console.error("tried to push an object that is not a node");
		return node;
	},
	loadTexture:function(file) {
		var tex = THREE.ImageUtils.loadTexture(file);
		tex.flipY = false;
		return tex;
	},
	root: new Node(null, this),
	child: null,
	camera: new THREE.OrthographicCamera(0, 320, 0, 120, 1, 32),
	renderScene: new THREE.Scene()
};

var RenderContext = function(width, height) {
	// get a webgl context if possible
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(width, height);
	this.renderer.domElement.className = "gamespace";
	console.log(this.renderer);
};

RenderContext.prototype = {
	constructor: RenderContext,
	addRendererToElement: function(elem) {
		elem.appendChild(this.renderer.domElement);
	}
};

// Entry point.
var Maruju = function (element, width, height) {

	this.renderContext = new RenderContext(width, height);
	this.rootScene = new BattleScene();
	this.renderContext.addRendererToElement(element);
	this.clock = new THREE.Clock();

	sans.queueText([
		"So I heard you wanted to have a bad time.",
		"Well, you came to the right place."
	]);

};

Maruju.prototype = {
	startDraw: function () {
		requestAnimationFrame(Maruju.prototype.startDraw.bind(this));

		var delta = this.clock.getDelta();
		this.rootScene._update(delta);

		this.renderContext.renderer.render(this.rootScene.getScene(), this.rootScene.getCamera());
	}
};
