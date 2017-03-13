// Typescript adaptation of mithril's test suite.
// Not intended to be run; only to compile & check types.

// Use types as script

const FRAME_BUDGET = 100

{
	let vnode = m("div")
	console.assert(vnode.tag === "div")
	console.assert(typeof m.version === "string")
	console.assert(m.version.indexOf(".") > -1)
}

{
	const vnode = m.trust("<br>")
}

{
	const vnode = m.fragment({key: 123}, [m("div")])
	console.assert((vnode.children as m.Vnode<any,any>[]).length === 1)
	console.assert(vnode.children![0].tag === 'div')
}

{
	const handler = m.withAttr("value", (value) => {})
	handler({currentTarget: {value: 10}})
}

{
	const params = m.parseQueryString("?a=1&b=2")
	const query = m.buildQueryString({a: 1, b: 2})
}

{
	const root = window.document.createElement("div")
	m.render(root, m("div"))
	console.assert(root.childNodes.length === 1)
}

{
	const root = window.document.createElement("div")
	m.mount(root, {view: function() {return m("div")}})
	console.assert(root.childNodes.length === 1)
	console.assert(root.firstChild!.nodeName === "DIV")
}

{
	const root = window.document.createElement("div")
	m.route(root, "/a", {
		"/a": {view: function() {return m("div")}}
	})

	setTimeout(function() {
		console.assert(root.childNodes.length === 1)
		console.assert(root.firstChild!.nodeName === "DIV")
	}, FRAME_BUDGET)
}

{
	const root = window.document.createElement("div")
	m.route.prefix("#")
	m.route(root, "/a", {
		"/a": {view: function() {return m("div")}}
	})

	setTimeout(function() {
		console.assert(root.childNodes.length === 1)
		console.assert(root.firstChild!.nodeName === "DIV")
	}, FRAME_BUDGET)
}

{
	const root = window.document.createElement("div")
	m.route(root, "/a", {
		"/a": {view: function() {return m("div")}}
	})

	setTimeout(function() {
		console.assert(m.route.get() === "/a")
	}, FRAME_BUDGET)
}

{
	const root = window.document.createElement("div")
	m.route(root, "/a", {
		"/:id": {view: function() {return m("div")}}
	})

	setTimeout(function() {
		m.route.set("/b")
		setTimeout(function() {
			console.assert(m.route.get() === "/b")
		}, FRAME_BUDGET)
	}, FRAME_BUDGET)
}

{
	let count = 0
	const root = window.document.createElement("div")
	m.mount(root, {view: function() {count++}})
	setTimeout(function() {
		m.redraw()
		console.assert(count === 2)
	}, FRAME_BUDGET)
}
