var addGroup = function ( name ) {
	var wrapper = New( {
		c: 'block',
		id: name,
		childs: [
			New( {
				type: 'div',
				c: 'title',
				text: name
			} ),
			New( {
				type: 'div',
				c: 'folder',
				text: '+',
				behave: [ 'folder' ],
			} ),
		],
	} );
	wrapper.style.height = CONTROL_BLOCK_HEIGHT_FOLDED;
	return wrapper;
};
var formControlNodes = function ( arg ) {
	var wrapper = arg.wrapper;
	var name = arg.name;
	var config = arg.config;
	var gname = arg.gname;
	var input, select, option;
	switch ( config.type ) {
		case 'number':
			input = New( { type: 'input', c: 'control', id: name+'-control', b: [ 'editController' ] } );
			input.type = 'number';
			input.min = 0;
			input.max = 1;
			input.step = 0.01;
			input.property = gname;
			wrapper.appendChild( New({ c: 'wrapper', ch: [ input ] }) );
			break;
		case 'units':
			select = New({ type: 'select', c: 'control', id: name+'-control', b: [ 'editController' ],
				ch: [
					New({ type: 'option', val: '', text: '' }),
					New({ type: 'option', val: 'auto', text: 'auto' }),
					New({ type: 'option', val: 'px', text: 'px' }),
					New({ type: 'option', val: 'em', text: 'em' }),
					New({ type: 'option', val: 'pt', text: 'pt' }),
					New({ type: 'option', val: '%', text: '%' }),
				]
			});
			select.property = gname;
			input = New( { type: 'input', c: 'control', id: name+'-control', b: [ 'editController' ] } );
			input.type = 'number';
			input.setAttribute('margin','y');
			input.property = gname;
			wrapper.appendChild( New({ c: 'wrapper', ch: [ input, select ] }) );
			break;
		case 'select':
			select = New( { type: 'select', c: 'control', id: name+'-control', b: [ 'editController' ] } );
			select.setAttribute('margin','y');
			config.values.forEach( function ( e ) {
				select.appendChild( New( { type: 'option', val: e, text: e } ) );
			});
			select.property = gname;
			wrapper.appendChild( New({ c: 'wrapper', ch: [ select ] }) );
			break;
		case 'color':
			input = New( { type: 'input', c: 'control', id: name+'-control', b: [ 'editController' ] } );
			input.type = 'color';
			input.property = gname;
			wrapper.appendChild( New({ c: 'wrapper', ch: [ input ] }) );
			break;
		case 'text':
			input = New( { type: 'input', c: 'control', id: name+'-control', b: [ 'editController' ] } );
			input.setAttribute('margin','y');
			input.type = 'text';
			input.property = gname;
			wrapper.appendChild( New({ c: 'wrapper', ch: [ input ] }) );
			break;
		case 'image':
			input = New( { type: 'input', c: 'control', id: name+'-control', b: [ 'editController' ] } );
			input.type = 'text';
			input.property = gname;
			wrapper.appendChild( New({ c: 'wrapper', ch: [ input ] }) );
			break;
	}
};
var addControl = function ( group, name, config ) {
	var wrapper = New( { c: 'block', id: name, childs: [ New( { type: 'span', c: 'title', text: name } ), New( { type: 'br' } ), ] } );
	group.appendChild( wrapper );
	if ( config.type == 'comp' ) {
		for ( item in config.comp ) {
			formControlNodes( { 'wrapper':wrapper, 'name':name+"-"+item, 'config':config.comp[item], 'gname': name } );
		}
	} else {
		formControlNodes( { 'wrapper':wrapper, 'name':name, 'config':config, 'gname': name } );
	}
	return wrapper;
};

document.body.appendChild(
	New({
		id: 'appframe',
		c: 'appframe',
	})
);
document.body.appendChild(
	New({
		id: 'modal-layer',
		c: 'modal-layer',
	})
);

document.onmousemove = Processor.mouseMoveProcessor;

editor = byId( 'controls' );

var App = new Application({
	mainLayer: new Layer({ node: byId( 'appframe' ) }),
	modalLayer: new Layer({ node: byId( 'modal-layer' ) }),
});

new WindowPanel({
	id: 'viewport-menu',
	layer: Application.current.mainLayer,
	ch: [
		New({
			id: 'viewport',
			c: 'viewport',
			childs: [
				New({
					id: 'viewportframe',
					c: 'frame',
				}),
			],
		}),
	],
});
new WindowPanel({
	id: 'nodes-menu',
	layer: Application.current.mainLayer,
	ch: [
		New({
			id: '',
			c:'tree-container',
			childs: [
				New({
					id: 'nodes-tree',
					c:'tree-view ease',
					childs: [
						New({
							id: 'nodes-tree-root',
							c: 'tree-item',
							t: 'body',
							behave: [  ],
							ch: [
								New({ c: 'btn-container', ch: [ New({ type: 'span', c: 'fa fa-file-o hover-hidden ease pointer', b: [ 'addNodeButton' ] }), ] }),
							],
						}),
					],
					behave: [ 'scrollable' ],
				}),
			]
		}),
	]
});
new WindowPanel({
	id: 'styles-menu',
	layer: Application.current.mainLayer,
	ch: [
		New({
			id: '',
			c:'tree-container',
			childs: [
				New({
					id: 'styles-tree',
					c:'tree-view ease',
					childs: [
						New({
							id: 'styles-tree-root',
							c: 'tree-item',
							t: 'classes',
							behave: [  ],
							ch: [
								New({
									c: 'btn-container',
									ch: [
										New({
											type: 'span',
											c: 'fa fa-file-o hover-hidden ease pointer',
											b: [ 'addStyleButton' ]
										}),
									]
								}),
							],
						}),
					],
					behave: [ 'scrollable' ],
				}),
			]
		}),
	]
});
new WindowPanel({
	id: 'hierarchy-menu',
	layer: Application.current.mainLayer,
	ch: [
		New({
			id: '',
			c:'tree-container',
			childs: [
				New({
					id: 'hierarchy-tree',
					c:'tree-view ease',
					childs: [
						New({
							id: 'hierarchy-tree-root',
							c: 'tree-item',
							t: 'styles',
							behave: [  ],
							/*ch: [
								New({
									c: 'btn-container',
									ch: [
										New({
											type: 'span',
											c: 'fa fa-file-o hover-hidden ease pointer',
											b: [ 'addStyleButton' ]
										}),
									]
								}),
							],*/
						}),
					],
					behave: [ 'scrollable' ],
				}),
			]
		}),
	]
});
new WindowPanel({
	id: 'edit-menu',
	layer: Application.current.mainLayer,
	ch: [
		New({
			id: '',
			c:'tree-container',
			childs: [
				New({
					id: '',
					c:'tree-view ease',
					childs: [
						New({
							id: 'controls',
							c: 'container controls',
							childs: function () {
								var groupNodes = [];
								for ( var group in controls_config ) {
									var groupNode = addGroup( group );
									for ( var control in controls_config[group] ) {
										addControl( groupNode, control, controls_config[group][control] );
									}
									groupNodes.push( groupNode );
								}
								return groupNodes;
							}.call(),
						}),
					],
					behave: [ 'scrollable' ],
				}),
			]
		}),
	],
});

Styler.setParents( document.head, byId( 'styles-tree-root' ) );
new Styler();
Styler.current.change( DEFAULT_STYLE );

Hierarchy.setParents( document.head, byId( 'hierarchy-tree-root' ) );
new Hierarchy();

Node.setParents( byId( 'viewportframe' ), byId( 'nodes-tree-root' ) );
new Node();

window.onload = function (e) {
	App.load();
};
window.onbeforeunload = function (e) {
	App.save();
};
