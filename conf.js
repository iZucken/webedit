var CONTROL_BLOCK_HEIGHT_FOLDED = '1.5em';
var DRAG_TYPE_GRABBER = 0;
var DRAG_TYPE_RESIZER = 1;
var WINDOW_TYPE_MODAL = 1;
var DEFAULT_STYLE = '{ border: 1px solid black; padding: 10px; margin: 10px; display: inline-block; }';
var behavior_types = {

	'folder': { 'evt': { 'click' : 'foldProcessor' }, 'state': { 'folded': true } },

	'window': { 'evt': { 'mousedown' : 'windowProcessor' }, 'state': { } },

	'scrollable': { 'evt': { 'mousewheel' : 'scrollProcessor' }, 'state': { } },

	'window-grabber': {
		'evt': { 'mousedown' : 'grabProcessor', 'mouseup' : 'releaseProcessor' },
		'state': { 'draggableType': DRAG_TYPE_GRABBER } },
	'window-resizer': {
		'evt': { 'mousedown' : 'grabProcessor', 'mouseup' : 'releaseProcessor' },
		'state': { 'draggableType': DRAG_TYPE_RESIZER } },

	'mouseMoveDetector': {
		'evt': { 'mousemove' : 'mouseMoveProcessor' },
		'state': { } },

	'editController': {
		'evt': { 'change' : 'controlProcessor', 'click' : 'controlProcessor' },
		'state': { } },

	'addNodeButton': { 'evt': { 'click' : 'nodeAddictor' }, 'state': { } },
	'duplicateNodeButton': { 'evt': { 'click' : 'nodeDuplicator' }, 'state': { } },
	'removeNodeButton': { 'evt': { 'click' : 'nodeRemover' }, 'state': { } },
	'nodeTreeItem': { 'evt': {
		'click' : 'setCurrentNodeItem',
		'mouseup' : 'releaseAboveNodeItem',
		'mousedown' : 'grabNodeItem',
	}, 'state': { } },

	'addStyleButton': { 'evt': { 'click' : 'styleAddictor' }, 'state': { } },
	'duplicateStyleButton': { 'evt': { 'click' : 'styleDuplicator' }, 'state': { } },
	'renameStyleButton': { 'evt': { 'click' : 'styleRenamer' }, 'state': { } },
	'removeStyleButton': { 'evt': { 'click' : 'styleRemover' }, 'state': { } },
	'styleTreeItem': { 'evt': { 'click' : 'setCurrentStyleItem', 'mousedown' : 'grabStyleItem' }, 'state': { } },

	'styleRenamerSubmit': { 'evt': { 'submit' : 'styleNameSubmitter' }, 'state': { } },

	'nodeDisplay': { 'evt': {
		'click' : 'setCurrentNodeItem',
		'mouseup' : 'releaseAboveStyleItem',
		'mousedown' : 'grabStyleItem',
	}, 'state': { } },
	
	'destroyContainer': { 'evt': { 'click' : 'containerDestroyer' }, 'state': { } },

}
var controls_config = {
	'pos & display' : {
		'top': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'top-bottom',
		},
		'bottom': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'top-bottom',
		},
		'left': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'left-right',
		},
		'right': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'left-right',
		},
		'display': {
			'type': 'select',
			'values': [ 'block', 'inline', 'inline-block', 'none' ],
		},
		'position': {
			'type': 'select',
			'values': [ 'inherit', 'fixed', 'absolute', 'relative', 'static' ],
		},
		'float': {
			'type': 'select',
			'values': [ 'inherit', 'left', 'right', 'none' ],
		},
		'top': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'top-bottom',
		},
		'bottom': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'top-bottom',
		},
		'left': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'left-right',
		},
		'right': {
			'type': 'units',
			'mutable': true,
			'mutegroup': 'left-right',
		},
	},
	'group 1': {
		'width': {
			'type': 'units',
		},
		'height': {
			'type': 'units',
		},
		'margin': {
			'type': 'comp',
			'comp': {
				'top': { 'type': 'units', },
				'right': { 'type': 'units', },
				'bottom': { 'type': 'units', },
				'left': { 'type': 'units', },
			},
		},
		'padding': {
			'type': 'comp',
			'comp': {
				'top': { 'type': 'units', },
				'right': { 'type': 'units', },
				'bottom': { 'type': 'units', },
				'left': { 'type': 'units', },
			},
		},
		'border-width': {
			'type': 'comp',
			'comp': {
				'top': { 'type': 'units', },
				'right': { 'type': 'units', },
				'bottom': { 'type': 'units', },
				'left': { 'type': 'units', },
			},
		},
		'border-radius': {
			'type': 'comp',
			'comp': {
				'top': { 'type': 'units', },
				'right': { 'type': 'units', },
				'bottom': { 'type': 'units', },
				'left': { 'type': 'units', },
			},
		},
		'border-style': {
			'type': 'comp',
			'comp': {
				'top': {
					'type': 'select',
					'values': [ ' ', 'dotted', 'dashed', 'double', 'solid', 'none' ],
				},
				'right': {
					'type': 'select',
					'values': [ ' ', 'dotted', 'dashed', 'double', 'solid', 'none' ],
				},
				'bottom': {
					'type': 'select',
					'values': [ ' ', 'dotted', 'dashed', 'double', 'solid', 'none' ],
				},
				'left': {
					'type': 'select',
					'values': [ ' ', 'dotted', 'dashed', 'double', 'solid', 'none' ],
				},
			},
		},
		'border-color': {
			'type': 'comp',
			'comp': {
				'top': { 'type': 'text', },
				'right': { 'type': 'text', },
				'bottom': { 'type': 'text', },
				'left': { 'type': 'text', },
			},
		},
	},
	'background': {
		'background-color': {
			'type': 'text',
		},
	},
	'text / font': {
		'font-size': {
			'type': 'units',
		},
		'line-height': {
			'type': 'units',
		},
		'color': {
			'type': 'text',
		},
		'text-align': {
			'type': 'select',
			'values': [ ' ', 'inherit', 'left', 'center', 'right', 'justify' ],
		},
	},
}