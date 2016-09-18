// Type definitions for mithril.js 1.0
// Project: https://github.com/lhorie/mithril.js
// Definitions by: Mike Linkovich <https://github.com/spacejack>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Typescript 2.0.2

declare namespace Mithril {

	interface Hyperscript {
		(selector: string, ...children: any[]): Vnode;
		(component: Component, ...children: Hargs[]): Vnode;
		fragment(attrs: any, children: any[]): Vnode;
		trust(html: string): TrustedString;
	}

	interface RouteResolver {
		render?: (vnode: Mithril.Vnode) => Mithril.Vnode
		onmatch?: (resolve: (c: Component) => void, args: any, path: any) => void
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
		link(vnode: Vnode): (e: Event) => void;
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
		(el: Element, vnodes: Vnode | Vnode[]): void;
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

	type Harg = string | Vnode | Attributes;
	interface HargsArray extends Array<Hargs> {}
	type Hargs = Harg | HargsArray;

	// Vnode children types
	type Child = string | number | boolean | Vnode;
	interface ChildArray extends Array<Children> {}
	type Children = Child | ChildArray;

	/** Mithril Vnode type */
	interface Vnode {
		tag: string | Component;
		key?: string;
		attrs?: any;
		children?: Children[];
		dom?: Element;
		domSize?: number;
		state: any;
		events?: any;
	}

	interface Component {
		// Note: this return type requires TS 2.0
		view: (vnode: Vnode) => Vnode | (Vnode | null)[] | null;
		// For TS 1.x
		//view: (vnode: Vnode) => Vnode | Vnode[];
		oninit?: (vnode: Vnode) => void;
		oncreate?: (vnode: Vnode) => void;
		onbeforeremove?: (vnode: Vnode, done?: () => void) => void;
		onremove?: (vnode: Vnode) => void;
		onbeforeupdate?: (vnode: Vnode, old: Vnode) => boolean;
		onupdate?: (vnode: Vnode) => void;
		[property: string]: any;
	}

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
