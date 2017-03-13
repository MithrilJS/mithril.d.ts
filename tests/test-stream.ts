import * as createStream from '../stream'
import {Stream} from '../stream'

{
	const stream = createStream(1)
	const initialValue = stream()
	stream(2)
	const newValue = stream()
	console.assert(initialValue === 1)
	console.assert(newValue === 2)
}

{
	const stream = createStream()
	console.assert(stream() === undefined)
}

{
	const stream: Stream<number | undefined> = createStream(1)
	stream(undefined)
	console.assert(stream() === undefined)
}

{
	const stream = createStream(createStream(1))
	console.assert(stream()() === 1)
}

{
	const stream = createStream()
	const doubled = createStream.combine(function(s) {return s() * 2}, [stream])
	stream(2)
	console.assert(doubled() === 4)
}

{
	const stream = createStream(2)
	const doubled = createStream.combine(function(s) {return s() * 2}, [stream])
	console.assert(doubled() === 4)
}

{
	const s1 = createStream()
	const s2 = createStream()
	const added = createStream.combine(function(s1, s2) {return s1() + s2()}, [s1, s2])
	s1(2)
	s2(3)
	console.assert(added() === 5)
}

{
	const s1 = createStream(2)
	const s2 = createStream(3)
	const added = createStream.combine(function(s1, s2) {return s1() + s2()}, [s1, s2])
	console.assert(added() === 5)
}

{
	const s1 = createStream(2)
	const s2 = createStream()
	const added = createStream.combine(function(s1, s2) {return s1() + s2()}, [s1, s2])
	s2(3)
	console.assert(added() === 5)
}

{
	let count = 0
	const a = createStream()
	const b = createStream.combine(function(a) {return a() * 2}, [a])
	const c = createStream.combine(function(a) {return a() * a()}, [a])
	const d = createStream.combine(function(b, c) {
		count++
		return b() + c()
	}, [b, c])
	a(3)
	console.assert(d() === 15)
	console.assert(count === 1)
}

{
	let count = 0
	const a = createStream(3)
	const b = createStream.combine(function(a) {return a() * 2}, [a])
	const c = createStream.combine(function(a) {return a() * a()}, [a])
	const d = createStream.combine(function(b, c) {
		count++
		return b() + c()
	}, [b, c])
	console.assert(d() === 15)
	console.assert(count === 1)
}

{
	let streams: Stream<any>[] = []
	const a = createStream()
	const b = createStream()
	const c = createStream.combine(function(a, b, changed) {
		streams = changed
	}, [a, b])
	a(3)
	b(5)
	console.assert(streams.length === 1)
	console.assert(streams[0] === b)
}

{
	let streams: Stream<number>[] = []
	const a = createStream(3)
	const b = createStream(5)
	const c = createStream.combine(function(a, b, changed) {
		streams = changed
	}, [a, b])
	a(7)
	console.assert(streams.length === 1)
	console.assert(streams[0] === a)
}

{
	const a = createStream(1)
	const b = createStream.combine(function(a) {
		return undefined
	}, [a])

	console.assert(b() === undefined)
}

{
	const a = createStream(1)
	const b = createStream.combine(function(a) {
		return createStream(2)
	}, [a])
	console.assert(b()() === 2)
}

{
	const a = createStream(1)
	const b = createStream.combine(function(a) {
		return createStream()
	}, [a])
	console.assert(b()() === undefined)
}

{
	let count = 0
	const a = createStream(1)
	const b = createStream.combine(function(a) {
		return createStream.HALT
	}, [a])
	["fantasy-land/map"](function() {
		count++
		return 1
	})
	console.assert(b() === undefined)
}

{
	const all = createStream.merge([
		createStream(10),
		createStream("20"),
		createStream({value: 30}),
	])
}

{
	const straggler = createStream()
	const all = createStream.merge([
		createStream(10),
		createStream("20"),
		straggler,
	])
	console.assert(all() === undefined)
	straggler(30)
}

{
	let value = 0
	const id = function(value: number) {return value}
	const a = createStream<number>()
	const b = createStream<number>()

	const all = createStream.merge([a.map(id), b.map(id)]).map(function(data) {
		value = data[0] + data[1]
	})

	a(1)
	b(2)
	console.assert(value === 3)

	a(3)
	b(4)
	console.assert(value === 7)
}

{
	const stream = createStream()
	const doubled = createStream.combine(function(stream) {return stream() * 2}, [stream])
	stream.end(true)
	stream(3)
	console.assert(doubled() === undefined)
}

{
	const stream = createStream(2)
	const doubled = createStream.combine(function(stream) {return stream() * 2}, [stream])
	stream.end(true)
	stream(3)
	console.assert(doubled() === 4)
}

{
	const stream = createStream(2)
	stream.end(true)
	const doubled = createStream.combine(function(stream) {return stream() * 2}, [stream])
	stream(3)
	console.assert(doubled() === undefined)
}

{
	const stream = createStream(2)
	const doubled = createStream.combine(function(stream) {return stream() * 2}, [stream])
	doubled.end(true)
	stream(4)
	console.assert(doubled() === 4)
}

{
	const stream = createStream<number>()
	const doubled = stream["fantasy-land/map"](function(value: number) {return value * 2})
	stream(3)
	console.assert(doubled() === 6)
}

{
	const stream = createStream(3)
	const doubled = stream["fantasy-land/map"](function(value: number) {return value * 2})
	console.assert(doubled() === 6)
}

{
	const stream = createStream<undefined>()
	const mapped = stream["fantasy-land/map"](function(value: undefined) {return String(value)})
	stream(undefined)
	console.assert(mapped() === "undefined")
}

{
	const stream = createStream(undefined)
	const mapped = stream["fantasy-land/map"](function(value: undefined) {return String(value)})
	console.assert(mapped() === "undefined")
}

{
	const stream = createStream(undefined)
	const mapped = stream["fantasy-land/map"](function(value: undefined) {return createStream()})
	console.assert(mapped()() === undefined)
}

{
	const stream = createStream(undefined)
	console.assert(stream["fantasy-land/map"] === stream.map)
}

{
	const apply = createStream(function(value: number) {return value * 2})
	const stream = createStream(3)
	const applied = stream["fantasy-land/ap"](apply)
	console.assert(applied() === 6)
	apply(function(value) {return value / 3})
	console.assert(applied() === 1)
	stream(9)
	console.assert(applied() === 3)
}

{
	const apply = createStream(function(value: undefined) {return String(value)})
	const stream = createStream(undefined)
	const applied = stream["fantasy-land/ap"](apply)
	console.assert(applied() === "undefined")
	apply(function(value) {return String(value) + "a"})
	console.assert(applied() === "undefineda")
}

{
	const stream = createStream(3)
	const mapped = stream["fantasy-land/map"](function(value: number) {return value})
	console.assert(stream() === mapped())
}

{
	const f = function f(x: number) {return x * 2}
	const g = function g(x: number) {return x * x}
	const stream = createStream(3)
	const mapped = stream["fantasy-land/map"](function(value: any) {return f(g(value))})
	const composed = stream["fantasy-land/map"](g)["fantasy-land/map"](f)
	console.assert(mapped() === 18)
	console.assert(mapped() === composed())
}

{
	const a = createStream(function(value: number) {return value * 2})
	const u = createStream(function(value: number) {return value * 3})
	const v = createStream(5)
	const mapped = v["fantasy-land/ap"](u["fantasy-land/ap"](a["fantasy-land/map"](function(f: any) {
		return function(g: any) {
			return function(x: any) {
				return f(g(x))
			}
		}
	})))
	const composed = v["fantasy-land/ap"](u)["fantasy-land/ap"](a)
	console.assert(mapped() === 30)
	console.assert(mapped() === composed())
}

{
	const a = createStream()["fantasy-land/of"](function(value: number) {return value})
	const v = createStream(5)
	console.assert(v["fantasy-land/ap"](a)() === 5)
	console.assert(v["fantasy-land/ap"](a)() === v())
}

{
	const a = createStream(0)
	const f = function(value: number) {return value * 2}
	const x = 3
	console.assert(a["fantasy-land/of"](x)["fantasy-land/ap"](a["fantasy-land/of"](f))() === 6)
	console.assert(a["fantasy-land/of"](x)["fantasy-land/ap"](a["fantasy-land/of"](f))() === a["fantasy-land/of"](f(x))())
}

{
	const u = createStream(function(value: number) {return value * 2})
	const a = createStream()
	const y = 3
	console.assert(a["fantasy-land/of"](y)["fantasy-land/ap"](u)() === 6)
	console.assert(a["fantasy-land/of"](y)["fantasy-land/ap"](u)() === u["fantasy-land/ap"](a["fantasy-land/of"](function(f: any) {return f(y)}))())
}
