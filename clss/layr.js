var _layr = constructClass( _layr, function ( definition ) {
	var node = definition.node || null;
	if ( isDOM( definition.node ) ) { this.node = definition.node } else { console.warn('Node specified is not a DOM object'); }
	this.windows = [];
	_layr.last = this;
}, {
	last: null,
	addWindow: function ( arg ) {
		this.windows.push[ arg ],
		arg.layer = this;
		arg.node.style.zIndex = 1 + this.windows.length;
	},
});