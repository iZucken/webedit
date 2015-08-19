var _hier = constructClass( _hier, function ( definition ) {
	var def = definition || null;
	
}, {
	parentOfDisplayNodes: null,
	parentOfControlNodes: null,
	current: null,
	numOfStyles: 0,
	setParents: function ( parentOfDisplayNodes, parentOfControlNodes ) {
		this.parentOfDisplayNodes = parentOfDisplayNodes || this.parentOfDisplayNodes;
		this.parentOfControlNodes = parentOfControlNodes || this.parentOfControlNodes;
	},
});

