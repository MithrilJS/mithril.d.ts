import * as m from 'mithril'

interface Result {
	id: number
}

m.request<Result>({method: "GET", url: "/item"}).then(result => {
	console.log(result.id)
})

m.request<{a: string}>("/item", {method: "POST"}).then(result => {
	console.log(result.a)
})

m.request<any>({
	method: "GET",
	url: "/item",
	data: {x: "y"}
}).then(result => {
	console.log(result)
})

m.request<Result>({
	method: "GET",
	url: "/item",
	data: 5,
	serialize: (data: number) => "id=" + data.toString()
}).then(result => {
	console.log(result)
})

m.request<Result>('/item', {
	method: "GET",
	deserialize: str => JSON.parse(str) as Result
}).then(result => {
	console.log(result.id)
})

m.request<Result>('/id', {
	method: "GET",
	extract: xhr => JSON.stringify({id: xhr.responseText})
}).then(result => {
	console.log(result.id)
})

m.request<Result>('/item', {
	config: xhr => {
		xhr.setRequestHeader('accept', '*')
	},
	headers: {"Content-Type": "application/json"},
	background: true,
}).then(result => {
	console.log(result.id)
})

class Item {
	identifier: number
	constructor(result: Result) {
		this.identifier = result.id
	}
}

m.request<Item>('/item', {
	method: 'GET',
	async: true,
	user: "Me",
	password: "qwerty",
	withCredentials: true,
	type: Item,
	useBody: false
}).then(item => {
	console.log(item.identifier)
})
