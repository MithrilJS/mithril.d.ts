import * as stream from '../stream'
import * as scanMerge from '../stream/scanMerge'

{
	const parent1 = stream<number>()
	const parent2 = stream<number>()

	const child = scanMerge([
		[parent1, (out, p1) => out + p1],
		[parent2, (out, p2) => out + p2]
	], -10)
}

{
	const parent1 = stream<string>()
	const parent2 = stream<string>()

	const child = scanMerge([
		[parent1, (out, p1) => out + p1],
		[parent2, (out, p2) => out + p2 + p2]
	], "a")

	parent1("b")
	parent2("c")
	parent1("b")

	console.log("is equal: " + (child() === 'abccb'))
}

{
	const parent1 = stream<string>()
	const parent2 = stream<number>()
	const child = scanMerge([
		[parent1, (out, p1) => out + p1],
		[parent2, (out, p2) => out + p2 + p2]
	], "a")

	parent1("a")
	parent2(1)

	console.log("is equal: " + (child() === 'aa11'))
}
