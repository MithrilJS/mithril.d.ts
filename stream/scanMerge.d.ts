import { Stream } from './'

declare namespace ScanMerge {
	interface scanMerge {
		/** Takes an array of pairs of streams and scan functions and merges all those streams using the given functions into a single stream. */
		<T,U>(pairs: [Stream<T>, (acc: U, value: T) => U][], acc: U): Stream<U>;
		/** Takes an array of pairs of streams and scan functions and merges all those streams using the given functions into a single stream. */
		<U>(pairs: [Stream<any>, (acc: U, value: any) => U][], acc: U): Stream<U>;
	}
}

declare const ScanMerge: ScanMerge.scanMerge;
export as namespace scanMerge;
export = ScanMerge;
