var _appc = constructClass( _appc, function ( definition ) {
	var	mainLayer = definition.mainLayer;
	var modalLayer = definition.modalLayer;
	this.mainLayer = mainLayer;
	this.modalLayer = modalLayer;
	_appc.last = this;
	_appc.current = this;
}, {
	last: null,
	current : null,
	load: function () {
		var s = window.localStorage, x = [].slice.call( getByClassD( 'svst' ) ), r = {};
		if ( s['menu-prefs'] ) {
			r = JSON.parse( s['menu-prefs'] );
			for ( e in x ) {
				x[e].style.top = r[ x[e].id ].x;
				x[e].style.left = r[ x[e].id ].y;
				x[e].style.width = r[ x[e].id ].w;
				x[e].style.height = r[ x[e].id ].h;
			}
		}
	},
	save: function () {
		var s = window.localStorage, x = [].slice.call( getByClassD( 'svst' ) ), r = {};
		for ( e in x ) {
			r[ x[e].id ] = {};
			r[ x[e].id ].x = x[e].style.top;
			r[ x[e].id ].y = x[e].style.left;
			r[ x[e].id ].w = x[e].style.width;
			r[ x[e].id ].h = x[e].style.height;
		}
		s['menu-prefs'] = JSON.stringify( r );
	},
});