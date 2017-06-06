var Processor = constructClass ( Processor, function ( definition ) {
}, {
	drags: null,
	lastx: null,
	lasty: null,
	windowProcessor: function ( e ) {
		var w = this.window;
		var z = w.layer.topmost.node.style.zIndex;
		w.layer.topmost.node.style.zIndex = this.style.zIndex;
		this.style.zIndex = z;
		w.layer.topmost = this.window;
	},
	scrollProcessor: function ( e ) {
		var d = e.wheelDelta;
		var top = this.style.top ? parseInt( this.style.top ) : 0;
		var ph = window.getComputedStyle( this.parentNode );
			ph = parseInt( ph.height );
		var h = window.getComputedStyle( this );
			h = parseInt( h.height );
		this.style.top = Math.min( -0, Math.max( -h + ph + 0, top + d ) );
	},
	mouseMoveProcessor: function ( e ) {
	},
	mdownOverLayer: function ( e ) {
		if ( e.target.pickable ) {
			this.pickedElement = e.target;
		}
	},
	mupOverLayer: function ( e ) {
		this.pickedElement = null;
	},
	mmoveOverLayer: function ( e ) {
		var i;
		var X = e.clientX;
		var Y = e.clientY;
		var x = this.lastPos.x;
		var y = this.lastPos.y;
		this.lastPos.x = X;
		this.lastPos.y = Y;
		var e = this.pickedElement;
		if ( e ) {
			if ( e.draggableType == DRAG_TYPE_GRABBER ) {
				e.parentNode.style.top = Math.floor( Y / 8 ) * 8;
				e.parentNode.style.left = Math.floor( X / 8 ) * 8;
			}
			if ( e.draggableType == DRAG_TYPE_RESIZER ) {
				e.parentNode.style.width = ( i = Math.floor( ( X - parseInt( e.parentNode.style.left ) ) / 8 ) * 8 ) ? i : 8;
				e.parentNode.style.height = ( i = Math.floor( ( Y - parseInt( e.parentNode.style.top ) ) / 8 ) * 8 ) ? i : 8;
			}
		}
	},
	editableProcessor: function (  ) {
		if ( current == this ) {
			if ( this.parentNode.nodeName == 'BODY' ) {
				current = this;
			}
			current = this.parentNode;
		} else {
			current = this;
		}
	},
	controlProcessor: function (  ) {
		var s = "{";
		var p = this.parentNode;
		s += this.property + ":";
		var ctrl = getByClass( p, 'control' );
		for ( i = 0; i < ctrl.length; i++ ) {
			if ( ctrl[i].getAttribute( 'margin' ) == 'y' ) {
				s += " "+ctrl[i].value;
			} else {
				s += ctrl[i].value;
			}
		}
		s += "}";
		console.info( s );
		Styler.current.change( s );
	},
	foldProcessor: function (  ) {
		if ( this.folded ) {
			this.parentNode.style.height = 'auto';
			this.textContent = '-';
			this.folded = false;
		} else {
			this.parentNode.style.height = CONTROL_BLOCK_HEIGHT_FOLDED;
			this.textContent = '+';
			this.folded = true;
		}
	},
	setCurrentStyleItem: function () {
		console.log( this.compositor );
		Styler.current = this.compositor;
	},
	setCurrentNodeItem: function () {
		Node.current = this.compositor;
	},
	nodeAddictor: function () {
		new Node({ parent: this.compositor || null });
	},
	nodeDuplicator: function () {
	},
	nodeRemover: function () {
	},
	styleAddictor: function () {
		new Styler({ parent: this.compositor || null });
	},
	styleDuplicator: function () {
	},
	styleRenamer: function () {
		var pos = this.getBoundingClientRect();
		var comp = this.compositor;
		var e = New({
					type: 'input',
					v: comp.Name,
					prop: { type: 'text' },
				});
		var f = New({
					type: 'form',
					prop: { compositor: comp, valuer: e },
					b: [ 'styleRenamerSubmit' ],
					ch: [ e ],
				});
		new Window({
			pos: { x: pos.left, y: pos.top },
			ch: [ f ],
			type: WINDOW_TYPE_MODAL,
			layer: App.modalLayer,
		});
		e.focus();
	},
	styleNameSubmitter: function ( e ) {
		e.preventDefault();
		this.compositor.setName( this.valuer.value );
		this.parentNode.remove();
	},
	styleRemover: function () {
	},
	releaseAboveNodeItem: function ( e ) {
		var drags = Processor.drags || null;
		if ( drags ) {
			console.log( this.compositor );
			this.compositor.setStyler( drags );
			drags = null;
		}
		Processor.drags = null;
	},
	grabNodeItem: function ( e ) {
		Processor.drags = this;
	},
	releaseAboveStyleItem: function ( e ) {
		Processor.drags = null;
	},
	grabStyleItem: function ( e ) {
		Processor.drags = this.compositor;
	},
	containerDestroyer: function ( e ) {
		this.parentNode.remove();
		this.remove();
	},
} );
