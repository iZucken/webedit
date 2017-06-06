var Window = constructClass( Window, function ( definition ) {
	var pos = definition.position || definition.pos || definition.p;
	var text = definition.text || definition.t;
	var childs = definition.childs || definition.ch;
	var type = definition.type;
	var layer = definition.layer;
	var id = definition.id || null;
	childs.push( New({ id: '', c:'grabber no-select ease', behave: [ 'window-grabber' ] }) );
	childs.push( New({ id: '', c:'resizer no-select ease', behave: [ 'window-resizer' ] }) );
	var e = New({
		id: id,
		c: type == WINDOW_TYPE_MODAL ? 'window-modal no-select svst' : 'window no-select svst',
		t: text,
		p: !!layer ? layer.node : type == WINDOW_TYPE_MODAL ? Application.current.modalLayer.node : Application.current.mainLayer.node,
		s: type == WINDOW_TYPE_MODAL ? ( 'top:'+pos.y+';left:'+pos.x ) : null,
		ch: childs,
		behave: [ 'window' ]
	});
	this.node = e;
	layer.windows.push( this );
	e.style.zIndex = layer.windows.length;
	layer.topmost = this;
	e.window = this;
	e.window.layer = !!layer ? layer : type == WINDOW_TYPE_MODAL ? Application.current.modalLayer : Application.current.mainLayer;
}, {
	last: null,
});