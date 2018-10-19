# Typescript Definitions for [Mithril 1.1](https://github.com/lhorie/mithril.js)

Requires TypeScript 2.x.

## Install

Install from npm with:

    npm install -D @types/mithril

### Promise support in ES5

Please note that while Mithril polyfills Promise support, this type definition does not include a type declaration for Promises. You may see an error like:

```
'Promise' only refers to a type, but is being used as a value here.
```

To use promises, you should add the `"es2015.promise"` library option to your compiler options. In `tsconfig.json`:

```JSON
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "es2015.promise",
      ...
    ]
  }
}
```

### ES Module Interop

In order to import Mithril's commonjs export in the form:

```typescript
import m from 'mithril';
```

you may need to set the `"esModuleInterop"` option in your `tsconfig.json`.

```JSON
{
  "compilerOptions": {
    "esModuleInterop": true,
    ...
  }
}
```

This setting may depend on the bundler you're using (Browserify, Webpack, Rollup, Parcel, etc.)

---

## The Gist:

#### POJO `Component` example using `vnode.state`:

```typescript
import m from 'mithril';

export interface Attrs {
  name: string;
}

interface State {
  count: number;
}

export default {
  oninit (vnode) {
    vnode.state.count = 0;
  },
  view (vnode) {
    return m('span', `name: ${vnode.attrs.name}, count: ${vnode.state.count}`);
  }
} as m.Component<Attrs,State>;
```

Note that all types can be accessed via `m` as above.

#### POJO `Comp` example using `this` state:

```typescript
import m from 'mithril';

export interface Attrs {
  name: string;
}

interface State {
  count: number;
}

export default {
  count: 0,
  view ({attrs}) {
    return m('span', `name: ${attrs.name}, count: ${this.count}`);
  }
} as m.Comp<Attrs,State>;
```

#### `ClassComponent` example, importing types separately:

```typescript
import m, {ClassComponent, CVnode} from 'mithril';

export interface Attrs {
  name: string;
}

export default class MyComponent implements ClassComponent<Attrs> {
  count = 0;
  // Note that class methods cannot infer parameter types
  view ({attrs}: CVnode<Attrs>) {
    return m('span', `name: ${attrs.name}, count: ${this.count}`);
  }
}
```

#### `FactoryComponent` example:

```typescript
import m from 'mithril';

export interface Attrs {
  name: string;
}

const comp: m.FactoryComponent<Attrs> = function() {
  let count = 0;
  return {
    view ({attrs}) {
      return m('span', `name: ${attrs.name}, count: ${count}`);
    }
  }
};
export default comp;
```

#### `Stream` example:

```typescript
import stream, {Stream} from 'mithril/stream';

const num = stream(1);
const text = stream<string>();
let s: Stream<Foo>;
s = stream(new Foo());
```

## JSX/TSX

Library support is required for full TSX support and cannot be accomplished with types alone. See the NPM package [mithril-tsx-component](https://www.npmjs.com/package/mithril-tsx-component).

## Script/Global Usage

If you are adding mithril to your page as a separate script, then you can install the [global version](https://github.com/spacejack/mithril-global.d.ts) of these types.

---

For more example usage see the `test` folder.

**NOTE** This repo is not guaranteed to be in sync with DefinitelyTyped. Please use the DT types for your applications. This repo is maintained primarily for documentation and issues.

## Install this repo

    npm install

### Test lint

    npm run lint

You can also try compiling with `npm test` (which runs tsc) however there are intentional errors in the tests to ensure type checks will catch those errors.
