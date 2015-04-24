var New = function ( arg ) {
	var doc = arg.doc || document;
	var type = arg.type || 'div';
	var className = arg.className || arg.class || arg.c;
	var id = arg.id;
	var text = arg.text || arg.t;
	var childs = arg.childs || arg.ch || [];
	var parent = arg.parent || arg.p;
	var value = arg.value || arg.val || arg.v;
	var name = arg.name || arg.n;
	var behavior = arg.behavior || arg.behave || arg.b;
	var style = arg.style || arg.s;
	var props = arg.prop;
	var e = doc.createElement( type );
	if ( className ) { e.className = className }
	if ( id ) { e.id = id }
	if ( text ) { e.innerHTML = text }
	if ( name ) { e.name = name }
	if ( style ) { console.info( style ); e.setAttribute( 'style', style ) }
	if ( props ) {
		for ( var prop in props ) {
			e[prop] = props[prop];
		}
	}
	if ( behavior ) {
		for ( var b_type in behavior ) {
			var b_type_s = behavior[b_type];
			if ( behavior_types[b_type_s] ) {
				for ( var b in behavior_types[ b_type_s ]['evt'] ) {
					addEvent( e, b, _proc[ behavior_types[ b_type_s ]['evt'][b] ] );
				}
				for ( var s in behavior_types[ b_type_s ]['state'] ) {
					e[s] = behavior_types[ b_type_s ]['state'][s];
				}
			} else {
				console.warn( 'No such (' + ( b_type_s || 'empty' ) + ') behaviour for ' + ( id || name || text || className || 0 ) + '!' );
			}
		}
	}
	if ( childs ) {
		for ( var i = 0; i < childs.length; i++ ) {
			try {
				e.appendChild( childs[ i ] )
			} catch ( err ) {
				console.warn( err );
			}
		}
	}
	if ( parent ) { parent.appendChild( e ) }
	if ( value ) { e.value = value }
	return e;
};

var getById = function ( ) { return arguments[0].getElementById( arguments[1] ) };

var getByClass = function ( ) { return arguments[0].getElementsByClassName( arguments[1] ); };

var addEvent = function ( ) { arguments[0].addEventListener( arguments[1], arguments[2] ); return arguments[0] };

var constructClass = function ( name, definition, properties ) {
	name = definition;
	for ( var d in properties ) {
		name[d] = properties[d];
	}
	name.prototype = name;
	return name;
};

var isDOMNode = function ( arg ) {
	return (
		typeof Node === "object" ?
		arg instanceof Node : 
		arg && typeof arg === "object" && typeof arg.nodeType === "number" && typeof arg.nodeName==="string"
	);
};

var isDOMElement = function ( arg ) {
	return (
		typeof HTMLElement === "object" ?
		arg instanceof HTMLElement :
		arg && typeof arg === "object" && arg !== null && arg.nodeType === 1 && typeof arg.nodeName==="string"
	);
};

var isDOM = function ( arg ) {
	return isDOMNode( arg ) || isDOMElement( arg );
}
