import * as stream from '../stream'
import * as scan from '../stream/scan'

{
	const parent = stream<number>()
	const child = scan((out, p) => out - p, 123, parent)
}

{
	const parent = stream<number>()
	const child = scan((arr, p) => arr.concat(p), [] as number[], parent)
	parent(7)
}
