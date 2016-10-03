// Type definitions for mithril.js 1.0
// Project: https://github.com/lhorie/mithril.js
// Definitions by: Mike Linkovich <https://github.com/spacejack>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Typescript 2.0

declare namespace Mithril {

	interface Lifecycle<A,S> {
		oninit?: (this: S, vnode: Vnode<A,S>) => void,
		oncreate?: (this: S, vnode: Vnode<A,S>) => void,
		onbeforeremove?: (this: S, vnode: Vnode<A,S>, done: () => void) => void,
		onremove?: (this: S, vnode: Vnode<A,S>) => void,
		onbeforeupdate?: (this: S, vnode: Vnode<A,S>, old: Vnode<A,S>) => boolean,
		onupdate?: (this: S, vnode: Vnode<A,S>) => void
	}

	interface Hyperscript {
		(selector: string, ...children: any[]): Vnode<any,any>;
		<A,S>(component: TComponent<A,S>, a?: A & Lifecycle<A,S>, ...children: any[]): Vnode<A,S>;
		fragment(attrs: any, children: any[]): Vnode<any,any>;
		trust(html: string): TrustedString;
	}

	interface RouteResolver {
		render?: (vnode: Mithril.Vnode<any,any>) => Mithril.Vnode<any,any>
		onmatch?: (resolve: (c: Component) => void, args: any, path?: string) => void
	}

	interface RouteDefs {
		[url: string]: Component | RouteResolver
	}

	interface RouteOptions {
		replace?: boolean;
	}

	interface Route {
		(element: HTMLElement, defaultRoute: string, routes: RouteDefs): void;
		get(): string;
		set(route: string, data?: any, options?: RouteOptions): void;
		prefix(urlFragment: string): void;
		link(vnode: Vnode<any,any>): (e: Event) => void;
	}

	interface Mount {
		(element: Element, component: Component): void;
	}

	interface WithAttr {
		<T>(name: string, stream: Stream<T>, thisArg?: any): (e: Event) => boolean;
		(name: string, callback: (value: any) => boolean, thisArg?: any): (e: Event) => boolean;
	}

	type Unary<T,U> = (input: T) => U;

	interface Functor<T> {
		map<U>(f: Unary<T,U>): Functor<U>;
		ap?(f: Functor<T>): Functor<T>;
	}

	interface Stream<T> {
		(): T;
		(value: T): this;
		run(tf: (current: T) => void): Stream<T>;
		run<U>(tf: (current: T) => void): Stream<U>;
		run<U>(tf: (current: T) => Stream<U>): Stream<U>;
		map<U>(tf: (current: T) => U): Stream<U>;
		catch(tf: (current: T) => void): Stream<T>;
		ap(f: Functor<T>): Functor<T>;
		end: Stream<boolean>;
	}

	interface StreamFactory {
		<T>(val?: T): Stream<T>;
		combine<T>(combiner: any, streams: Stream<T>[]): Stream<T>;
		reject<T>(value: T): Stream<T>;
		merge<T>(streams: Stream<T>[]): Stream<T>;
		run<T>(callback: (value: T) => void): Stream<T>;
		HALT: any;
	}

	interface Request {
		<T>(options: RequestOptions): Stream<T>;
	}

	interface RequestService {
		request: Request;
		jsonp: Jsonp;
	}

	interface Render {
		(el: Element, vnodes: Vnode<any,any> | Vnode<any,any>[]): void;
	}

	interface RenderService {
		render: Render;
	}

	interface Publish {
		(): void;
	}

	interface RedrawService {
		redraw: Publish;
	}

	interface Jsonp {
		<T>(options: JsonpOptions): Stream<T>;
	}

	interface Static extends Hyperscript {
		route: Route;
		mount: Mount;
		withAttr: WithAttr;
		prop: StreamFactory;
		render: Render;
		redraw: Publish;
		request: Request;
		jsonp: Jsonp;
		version: string;
	}

	// Parameter types for m(component, ...)
	interface Attributes {
		className?: string;
		class?: string;
		key?: string | number;
		[property: string]: any;
	}

	// Vnode children types
	type Child = string | number | boolean | Vnode<any,any>;
	interface ChildArray extends Array<Children> {}
	type Children = Child | ChildArray;

	/** Mithril Vnode type */
	interface Vnode<A, S extends Lifecycle<A,S>> {
		tag: string | TComponent<A,S>;
		attrs: A;
		state: S;
		key?: string;
		children?: Children[];
		dom?: Element;
		domSize?: number;
		events?: any;
	}

	/** Component with typed vnode state & attrs */
	interface TComponent<A, S extends Lifecycle<A,S>> extends Lifecycle<A,S> {
		view: (this: S, vnode: Vnode<A,S>) => Vnode<A,S> | (Vnode<A,S> | null)[] | null;
	}

	/** Component with untyped vnode state & attrs */
	interface Component extends TComponent<any,any> {}

	interface TrustedString extends String {
		/** @private Implementation detail. Don't depend on it. */
		$trusted: boolean;
	}

	interface RequestOptions {
		url: string;
		method: string;
		data?: any;
		async?: boolean;
		user?: string;
		password?: string;
		config?: any;
		type?: any;
		serialize?: (data: any) => string;
		deserialze?: (str: string) => any;
		extract?: (xhr: XMLHttpRequest, options?: any) => string;
		initialValue?: any;
		useBody?: boolean;
	}

	interface JsonpOptions {
		url: string;
		data?: any;
		type?: any;
		initialValue?: any;
		callbackName?: string;
		callbackKey?: string;
	}
}

declare module 'mithril' {
	const m: Mithril.Static;
	export = m;
}

declare module 'mithril/hyperscript' {
	const h: Mithril.Hyperscript;
	export = h;
}

declare module 'mithril/util/withAttr' {
	const withAttr: Mithril.WithAttr;
	export = withAttr;
}
