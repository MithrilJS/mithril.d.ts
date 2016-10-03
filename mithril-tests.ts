import * as m from 'mithril'

///////////////////////////////////////////////////////////
// 1.
// Simple, stateless example with untyped attrs, state.
// However vnode type (and its properties) is inferred.
//
const comp1: Mithril.Component = {
	oncreate ({dom}) {
		// dom type inferred
	},
	view (vnode) {
		return m('span', "Test")
	}
}

///////////////////////////////////////////////////////////
// 2.
// With typed attrs
//
interface Comp2Attrs {
	title: string
	description: string
}

const comp2: Mithril.TComponent<Comp2Attrs,{}> = {
	view ({attrs}) { // vnode, attrs types are inferred
		const {title, description} = attrs
		return [m('h2', title), m('p', description)]
	}
}

///////////////////////////////////////////////////////////
// 3.
// Declares attrs type inline.
// Uses comp2 with typed attrs and makes use of `onremove`
// lifecycle method.
//
const comp3: Mithril.TComponent<{pageHead: string},{}> = {
	oncreate ({dom}) {
		// Can do stuff with dom
	},
	view ({attrs}) {
		return m('.page',
			m('h1', attrs.pageHead),
			m(comp2,
				{
					// attrs is type checked - nice!
					title: "A Title",
					description: "Some descriptive text.",
					onremove: (vnode) => {
						console.log("comp2 was removed")
					},
				}
			)
		)
	}
}

///////////////////////////////////////////////////////////
// 4.
// Typed attrs and state, and `this` type is inferred.
//
interface Comp4Attrs {
	name: string
}

interface Comp4State {
	count: number
}

// Either of these two Comp4 defs will work:
type Comp4 = Mithril.TComponent<Comp4Attrs,Comp4State> & Comp4State
//interface Comp4 extends Mithril.Component<Comp4Attrs,Comp4State>, Comp4State {}

const comp4: Comp4 = {
	count: 0, // <- Must be declared to satisfy Comp4 type which includes Comp4State type
	oninit() {
		this.count = 0
	},
	view ({attrs}) {
		return [
			m('h1', `This ${attrs.name} has been clicked ${this.count} times`),
			m('button',
				{
					// 'this' is typed!
					onclick: () => this.count += 1
				},
			"Click me")
		]
	}
}

///////////////////////////////////////////////////////////
// 5.
// Stateful component (Equivalent to Comp4 example.)
// Avoids the use of `this` completely; state manipulated
// through vnode.state.
//
const comp5: Mithril.TComponent<Comp4Attrs,Comp4State> = {
	oninit ({state}) {
		state.count = 0
	},
	view ({attrs, state}) {
		return [
			m('h1', `This ${attrs.name} has been clicked ${state.count} times`),
			m('button',
				{
					onclick: () => state.count += 1
				},
			"Click me")
		]
	}
}

///////////////////////////////////////////////////////////
// 6.
// Concise module example with default export
//
interface Attrs {
	name: string
}

interface State {
	count: number
}

export default {
	count: 0,
	view ({attrs}) {
		return m('span', `name: ${attrs.name}, count: ${this.count}`)
	}
} as Mithril.TComponent<Attrs,State> & State
