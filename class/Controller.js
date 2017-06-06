var Controller = constructClass( Controller, function ( definition ) {
	args = args || {};
	var parent = definition.parent;

	var e = New({ doc: this.parentDocOfDisplayNodes, t: 'Node', p: parent.display || this.parentOfDisplayNodes, b: [ 'nodeDisplay' ], c: styler.display.className })
	e.compositor = this;
	this.display = e;

	var e = New({ doc: this.parentDocOfControlNodes, t: 'Node', p: parent.control || this.parentOfControlNodes, b: [ 'nodeTreeItem' ], c: 'tree-item', ch: [
		New({
			c: 'btn-container',
			ch: [
				New({ type: 'span', c: 'fa fa-file-o hover-hidden ease pointer', b: [ 'addNodeButton' ], prop: { compositor: this } }),
				New({ type: 'span', c: 'fa fa-files-o hover-hidden ease pointer', b: [ 'duplicateNodeButton' ], prop: { compositor: this } }),
				New({ type: 'span', c: 'fa fa-remove hover-hidden ease pointer', b: [ 'removeNodeButton' ], prop: { compositor: this } }),
			],
		}),
	]})
	e.compositor = this;
	this.control = e;

	Node.current = this;

}, {
	last: null,
});