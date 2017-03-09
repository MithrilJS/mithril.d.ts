import {Stream} from './'

declare namespace Scan {
	/** Creates a new stream with the results of calling the function on every incoming stream with and accumulator and the incoming value. */
	export type scan = <T, U>(fn: (acc: U, value: T) => U, acc: U, stream: Stream<T>) => Stream<U>;
}

declare const Scan: Scan.scan;
export as namespace scan;
export = Scan;
