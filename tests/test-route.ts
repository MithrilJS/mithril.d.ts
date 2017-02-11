import * as m from 'mithril'

const component1 = {
	view() {
		return m('h1', 'Test')
	}
}

const component2 = {
	view ({attrs: {title}}) {
		return m('h1', title)
	}
} as Mithril.Component<{title: string},{}>

m.route(document.body, '/', {
	'/': component1,
	'/test1': {
		onmatch (args, path) {
			return component1
		}
	},
	'/test2': {
		render(vnode) {
			return m(component1)
		}
	},
	'test3': {
		onmatch (args, path) {
			return component2
		},
		render (vnode) {
			return [m(component1), m(component2)]
		}
	},
	'test4': {
		onmatch (args, path) {
			// Must provide a Promise type if we want type checking
			return new Promise<Mithril.Component<{title: string},{}>>((resolve, reject) => {
				resolve(component2)
			})
		}
	}
})
