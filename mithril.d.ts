// Type definitions for mithril.js 1.0
// Project: https://github.com/lhorie/mithril.js
// Definitions by: Mike Linkovich <https://github.com/spacejack>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Typescript 1.8.10

declare namespace Mithril {

	interface Hyperscript {
		(selector: string, ...children: any[]): Vnode;
		(component: Component, ...children: Hargs[]): Vnode;
		trust(html: string): TrustedString;
	}

	interface Route {
		(el: HTMLElement, basePath: string, routes: {[url: string]: Component}): void;
		get(): string;
		set(route: string, data?: any, options?: RouteOptions): void;
		prefix(urlFragment: string): void;
		link(vnode: Vnode): (e: Event) => void;
	}

	interface Mount {
		(el: Element, component: Component): void;
	}

	interface WithAttr {
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
		run(callback: (value: T) => void): void;
		map<U>(f: (value: T) => U): Stream<U>;
		ap(f: Functor<T>): Functor<T>;
		end: Stream<boolean>;
	}

	interface StreamFactory {
		<T>(T?: any): Stream<T>;
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
		view: (vnode: Vnode) => Vnode | Vnode[];
		oninit?: (vnode: Vnode) => void;
		oncreate?: (vnode: Vnode) => void;
		onbeforeremove?: (vnode: Vnode, done?: () => void) => void;
		onremove?: (vnode: Vnode) => void;
		onbeforeupdate?: (vnode: Vnode, old: Vnode) => boolean;
		onupdate?: (vnode: Vnode) => void;
		[property: string]: any;
	}

	interface RouteOptions {
		replace?: boolean;
	}

	interface TrustedString extends String {
		/** @private Implementation detail. Don't depend on it. */
		$trusted: boolean;
	}

	interface RequestOptions {
		url: string;
		method?: string;
		data?: any;
		async?: boolean;
		user?: string;
		password?: string;
		config?: any;
		type?: any;
		serialize?: (data: any) => string;
		deserialze?: (str: string) => any;
		extract?: (xhr: any, options?: any) => string;
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

declare module 'mithril/hyperscript' {
	const h: Mithril.Hyperscript;
	export = h;
}

declare module 'mithril/route' {
	const route: Mithril.Route;
	export = route;
}

declare module 'mithril/mount' {
	const mount: Mithril.Mount;
	export = mount;
}

declare module 'mithril/util/withAttr' {
	const withAttr: Mithril.WithAttr;
	export = withAttr;
}

declare module 'mithril/stream' {
	const streamFactory: Mithril.StreamFactory;
	export = streamFactory;
}

declare module 'mithril/render' {
	const renderService: Mithril.RenderService;
	export = renderService;
}

declare module 'mithril/redraw' {
	const redrawService: Mithril.RedrawService;
	export = redrawService;
}

declare module 'mithril/request' {
	const requestService: Mithril.RequestService;
	export = requestService;
}

declare module 'mithril' {
	const m: Mithril.Static;
    export = m;
}
