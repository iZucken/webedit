var _wndw = constructClass( _wndw, function ( definition ) {
	var pos = definition.position || definition.pos || definition.p;
	var text = definition.text || definition.t;
	var childs = definition.childs || definition.ch;
	var type = definition.type;
	var layer = definition.layer;
	var id = definition.id || null;
	childs.push( New({ id: '', c:'resizer no-select ease', behave: [ 'window-resizer' ] }) );
	childs.unshift( New({ id: '', c:'grabber no-select ease', behave: [ 'window-grabber' ] }) );
	var e = New({
		id: id,
		c: type == WINDOW_TYPE_MODAL ? 'window-modal no-select svst' : 'window no-select svst',
		t: text,
		p: type == WINDOW_TYPE_MODAL ? _appc.current.modalLayer.node : _appc.current.mainLayer.node,
		s: type == WINDOW_TYPE_MODAL ? ( 'top:'+pos.y+';left:'+pos.x ) : null,
		ch: childs,
		behave: [ 'window' ]
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