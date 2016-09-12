# Typescript Definitions for Mithril 1.0

Requires TypeScript 2.x.

NOTE: Both Mithril 1.0 and these types are subject to change, so use at your own risk.

If you need to use TypeScript 1.x, the return type for `Component.view()` would need to change. See comment in source.

---

### Typed, stateful component example:

	interface Adder extends Mithril.Component {
		sum: number
		add: (n: number) => void
	}

	const adder: Adder = {
		sum: 0,
		add (this: Adder, n: number) {
			this.sum += n
		},
		oninit (this: Adder, vnode: Mithril.Vnode) {
			// Note that attrs is not typed (yet...)
			this.sum = vnode.attrs.initialSum as number
		},
		view (this: Adder, vnode: Mithril.Vnode) {
			return [
				m('p', "Sum: " + this.sum),
				m('button',
					{onclick: () => {this.add(1)}},
					"Add one"
				)
			]
		}
	}

	// Usage:
	m.mount(element, {view() {return m(adder, {initialSum: 1})}})

---

Pull requests and issues are welcome.
