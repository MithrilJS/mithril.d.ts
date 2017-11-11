import * as m from '..';
import { Vnode } from '../';
import * as h from '../hyperscript';

const vnode = m.fragment({id: 'abc'}, ['test']);

m.fragment({}, ['Test', 123]);

m.fragment(
	{
		id: 'abc',
		oninit: (vnode) => {
			console.log('oninit');
		}
	},
	[h('p', 'test1'), [123, h('p', 'abc'), ['abc']], 'Abc', h('p', 'test2')]
);
