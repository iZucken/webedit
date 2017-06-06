var Styler = constructClass ( Styler, function ( definition ) {
	definition = definition || {};
	var e = {};
	var parent = definition.parent || {};

	this.style = e;

	Styler.numOfStyles++;

	var name = definition.name || 'default';

	e = New({
		id: name+'-style-node',
		p: this.parentOfDisplayNodes,
		type: 'style',
		c: 'style_n_'+Styler.numOfStyles
	})
	e.compositor = this;
	this.display = e;

	var title = New({ c: 'title pointer', t: name });

	e = New({
		p: parent.control || this.parentOfControlNodes,
		id: name+'-style-tree-item',
		b: [ 'styleTreeItem' ],
		c: 'tree-item',
		ch: [
			title,
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
	this.title = title;

	this.Name = name;
	Styler.current = this;
}, {
	parentOfDisplayNodes: null,
	parentOfControlNodes: null,
	current: null,
	numOfStyles: 0,
	setParents: function ( parentOfDisplayNodes, parentOfControlNodes ) {
		this.parentOfDisplayNodes = parentOfDisplayNodes || this.parentOfDisplayNodes;
		this.parentOfControlNodes = parentOfControlNodes || this.parentOfControlNodes;
	},
	change: function ( style ) {
		this.display.sheet.insertRule( '.' + this.display.className + style, this.display.sheet.cssRules.length );
	},
	setName: function ( name ) {
		this.Name = name;
		this.title.textContent = name;
	},
} );