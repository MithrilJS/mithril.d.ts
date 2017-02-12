import * as m from 'mithril'

const vnode = m.fragment({id: 'abc'}, ['test'])

m.fragment({}, ['Test', 123])

m.fragment(
	{
		id: 'abc',
		oninit: (vnode: Mithril.Vnode<any,any>) => {
			console.log('oninit')
		}
	},
	[m('p', 'test1'), 'Abc', m('p', 'test2')]
)
