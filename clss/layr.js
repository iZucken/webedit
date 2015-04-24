var _layr = constructClass( _layr, function ( definition ) {
	var node = definition.node || null;
	if ( isDOM( definition.node ) ) { this.node = definition.node } else { console.warn('Node specified is not a DOM object'); }
	this.last = this;
	this.windows = [];
}, {
	last: null,
});