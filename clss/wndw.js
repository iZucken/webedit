_wndw = constructClass( _wndw, function ( definition ) {
	var pos = definition.position || definition.pos || definition.p;
	var text = definition.text || definition.t;
	var childs = definition.childs || definition.ch;
	var type = definition.type;
	var layer = definition.layer;
	var e = New({
		c: 'window-modal',
		t: text,
		p: type == WINDOW_TYPE_MODAL ? _appc.current.modalLayer : _appc.current.mainLayer,
		s: ( 'top:'+pos.y+';left:'+pos.x ),
		ch: childs,
	});
}, {
	last: null,
	setLayer: function ( arg ) {
		this.layer = arg;
	},
	setModalLayer: function ( arg ) {
		this.modalLayer = arg;
	},
});