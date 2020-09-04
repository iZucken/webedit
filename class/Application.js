var Application = function ( definition ) {
	var	mainLayer = definition.mainLayer;
	var modalLayer = definition.modalLayer;
	this.mainLayer = mainLayer;
	this.modalLayer = modalLayer;
	Application.last = this;
	Application.current = this;
};

Application.extend({
	last: null,
	current: null
});

Application.prototype.extend({
	saveAbleElements () {
		return [].slice.call( byClass( 'svst' ) );
	},
	load () {
		let r = {};
		let x = this.saveAbleElements();
		let item = localStorage.getItem('menu-prefs');
		if ( item ) {
			r = JSON.parse( item );
			for ( let e in x ) {
				x[e].style.top = r[ x[e].id ].x;
				x[e].style.left = r[ x[e].id ].y;
				x[e].style.width = r[ x[e].id ].w;
				x[e].style.height = r[ x[e].id ].h;
			}
		}
	},
	save () {
		let r = {};
		let x = this.saveAbleElements();
		for ( let e in x ) {
			r[ x[e].id ] = {};
			r[ x[e].id ].x = x[e].style.top;
			r[ x[e].id ].y = x[e].style.left;
			r[ x[e].id ].w = x[e].style.width;
			r[ x[e].id ].h = x[e].style.height;
		}
		localStorage.setItem('menu-prefs',JSON.stringify( r ));
	}
});
