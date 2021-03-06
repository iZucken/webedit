var Node = constructClass ( Node, function ( args ) {
	args = args || {};
	var styler = args.style || Styler.current || {};
	var parent = args.parent || {};

	var e = New({
		t: 'Node',
		p: parent.display || this.parentOfDisplayNodes,
		b: [ 'nodeDisplay' ],
		c: styler.display.className })
	e.compositor = this;
	this.display = e;

	var e = New({
		t: 'Node',
		p: parent.control || this.parentOfControlNodes,
		b: [ 'nodeTreeItem' ],
		c: 'tree-item',
		ch: [
			New({
				c: 'btn-container',
				ch: [
					New({ type: 'span', c: 'fa fa-file-o hover-hidden ease pointer', b: [ 'addNodeButton' ], prop: { compositor: this } }),
					New({ type: 'span', c: 'fa fa-files-o hover-hidden ease pointer', b: [ 'duplicateNodeButton' ], prop: { compositor: this } }),
					New({ type: 'span', c: 'fa fa-remove hover-hidden ease pointer', b: [ 'removeNodeButton' ], prop: { compositor: this } }),
				],
			}),
		]
	})
	e.compositor = this;
	this.control = e;

	Node.current = this;

}, {
	parentOfDisplayNodes: null,
	parentOfControlNodes: null,
	current: null,
	setParents: function ( parentOfDisplayNodes, parentOfControlNodes ) {
		this.parentOfDisplayNodes = parentOfDisplayNodes || this.parentOfDisplayNodes;
		this.parentOfControlNodes = parentOfControlNodes || this.parentOfControlNodes;
	},
	setStyler: function ( styler ) {
		this.styler = styler;
		console.log( styler );
		this.display.className = styler.display.className;
	},
} );