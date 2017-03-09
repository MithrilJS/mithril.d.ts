declare namespace Stream {
	export type Combiner<T> = (...streams: any[]) => T;

	export interface Stream<T> {
		/** Returns the value of the stream. */
		(): T;
		/** Sets the value of the stream. */
		(value: T): this;
		/** Creates a dependent stream whose value is set to the result of the callback function. */
		map(f: (current: T) => Stream<T> | T | void): Stream<T>;
		/** Creates a dependent stream whose value is set to the result of the callback function. */
		map<U>(f: (current: T) => Stream<U> | U): Stream<U>;
		/** This method is functionally identical to stream. It exists to conform to Fantasy Land's Applicative specification. */
		of(val?: T): Stream<T>;
		/** Apply. */
		ap<U>(f: Stream<(value: T) => U>): Stream<U>;
		/** A co-dependent stream that unregisters dependent streams when set to true. */
		end: Stream<boolean>;
		/** When a stream is passed as the argument to JSON.stringify(), the value of the stream is serialized.*/
		toJSON(): string;
		/** Returns the value of the stream. */
		valueOf(): T;
	}

	export interface Static {
		/** Creates a stream. */
		<T>(value?: T): Stream<T>;
		/** Creates a computed stream that reactively updates if any of its upstreams are updated. */
		combine<T>(combiner: Combiner<T>, streams: Stream<any>[]): Stream<T>;
		/** Creates a stream whose value is the array of values from an array of streams. */
		merge(streams: Stream<any>[]): Stream<any[]>;
		/** A special value that can be returned to stream callbacks to halt execution of downstreams. */
		readonly HALT: any;
	}
}

declare const Stream: Stream.Static;
export as namespace stream;
export = Stream;
