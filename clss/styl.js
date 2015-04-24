var _styl = constructClass ( _styl, function ( definition ) {
	definition = definition || {};
	var e = {};
	var parent = definition.parent || {};

	this.style = e;

	var name = definition.name || 'default';

	e = New({ doc: this.parentDocOfDisplayNodes, id: name+'-style-node', p: this.parentOfDisplayNodes, type: 'style', c: name })
	e.compositor = this;
	this.display = e;

	e = New({
		doc: this.parentDocOfControlNodes,
		p: parent.control || this.parentOfControlNodes,
		id: name+'-style-tree-item',
		b: [ 'styleTreeItem' ],
		t: name,
		c: 'tree-item',
		ch: [
			New({
				c: 'btn-container',
				ch: [
					New({ type: 'span', c: 'fa fa-file-o hover-hidden ease pointer', b: [ 'addStyleButton' ], prop: { compositor: this } }),
					New({ type: 'span', c: 'fa fa-files-o hover-hidden ease pointer', b: [ 'duplicateStyleButton' ], prop: { compositor: this } }),
					New({ type: 'span', c: 'fa fa-pencil hover-hidden ease pointer', b: [ 'renameStyleButton' ], prop: { compositor: this } }),
					New({ type: 'span', c: 'fa fa-remove hover-hidden ease pointer', b: [ 'removeStyleButton' ], prop: { compositor: this } }),
				],
			}),
		]
	})
	e.compositor = this;
	this.control = e;

	this.Name = name;
	_styl.current = this;
}, {
	parentOfDisplayNodes: null,
	parentOfControlNodes: null,
	parentDocOfDisplayNodes: null,
	parentDocOfControlNodes: null,
	current: null,
	setParentDocs: function ( parentOfDisplayNodes, parentOfControlNodes ) {
		this.parentDocOfDisplayNodes = parentOfDisplayNodes || this.parentDocOfDisplayNodes;
		this.parentDocOfControlNodes = parentOfControlNodes || this.parentDocOfControlNodes;
	},
	setParents: function ( parentOfDisplayNodes, parentOfControlNodes ) {
		this.parentOfDisplayNodes = parentOfDisplayNodes || this.parentOfDisplayNodes;
		this.parentOfControlNodes = parentOfControlNodes || this.parentOfControlNodes;
	},
	change: function ( style ) {
		this.display.sheet.insertRule( '.' + this.display.className + style, this.display.sheet.cssRules.length );
	},
	setName: function ( name ) {
		this.Name = name;
		this.display.className = name;
		console.log(this.control.childNodes[0]);
		this.control.childNodes[0].textContent = name;
	},
} );