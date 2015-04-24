_proc = constructClass ( _proc, function ( definition ) {
}, {
	drags: null,
	lastx: null,
	lasty: null,
	grabProcessor: function ( e ) {
		this.dragged = true;
		_proc.drags = this;
	},
	releaseProcessor: function ( e ) {
		this.dragged = false;
		_proc.drags = null;
	},
	tofrontProcessor: function ( e ) {
		this.parentNode.appendChild( this );
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
		var dragx = e.x;
		var dragy = e.y;
		_proc.lastx = dragx;
		_proc.lasty = dragy;
		drags = _proc.drags;
		if ( drags ) {
			if ( drags.draggableType == DRAG_TYPE_GRABBER ) {
				drags.parentNode.style.top = Math.floor( dragy / 8 ) * 8;
				drags.parentNode.style.left = Math.floor( dragx / 8 ) * 8;
			}
			if ( drags.draggableType == DRAG_TYPE_RESIZER ) {
				drags.parentNode.style.width = Math.floor( ( dragx - parseInt( drags.parentNode.style.left ) ) / 8 ) * 8;
				drags.parentNode.style.height = Math.floor( ( dragy - parseInt( drags.parentNode.style.top ) ) / 8 ) * 8;
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
		_styl.current.change( s );
	},
	foldProcessor: function (  ) {
		if ( this.folded ) {
			this.parentNode.style.height = 'auto';
			this.textContent = '+';
			this.folded = false;
		} else {
			this.parentNode.style.height = CONTROL_BLOCK_HEIGHT_FOLDED;
			this.textContent = '-';
			this.folded = true;
		}
	},
	setCurrentStyleItem: function () {
		console.log( this.compositor );
		_styl.current = this.compositor;
	},
	setCurrentNodeItem: function () {
		_node.current = this.compositor;
	},
	nodeAddictor: function () {
		new _node({ parent: this.compositor || null });
	},
	nodeDuplicator: function () {
	},
	nodeRemover: function () {
	},
	styleAddictor: function () {
		new _styl({ parent: this.compositor || null });
	},
	styleDuplicator: function () {
	},

	styleRenamer: function () {
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
					ch: [				
					],
				});
		new _wndw({
			pos: { x: _proc.lastx, y: _proc.lasty },
			ch: [ f ],
		});
		e1.focus();
	},
	styleNameSubmitter: function ( e ) {
		e.preventDefault();
		this.compositor.setName( this.valuer.value );
		this.parentNode.remove();
	},

	styleRemover: function () {
	},
	releaseAboveNodeItem: function ( e ) {
		var drags = _proc.drags || null;
		if ( drags ) {
			console.log( this.compositor );
			this.compositor.setStyler( drags );
			drags = null;
		}
		_proc.drags = null;
	},
	grabNodeItem: function ( e ) {
		_proc.drags = this;
	},
	releaseAboveStyleItem: function ( e ) {
		_proc.drags = null;
	},
	grabStyleItem: function ( e ) {
		_proc.drags = this.compositor;
	},
	containerDestroyer: function ( e ) {
		this.parentNode.remove();
		this.remove();
	},
} );
