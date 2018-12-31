# Typescript Definitions for [Mithril 1.x](https://github.com/lhorie/mithril.js)

Types are maintained at [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). Submit PRs there but you can submit issues here.

## Install

Requires TypeScript 2.x or later.

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

For **Rollup**, instead you should enable `"allowSyntheticDefaultImports"`:

```JSON
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    ...
  }
}
```
These setting may depend on the bundler you're using.

---

## The Gist:

### Component examples

#### Simple, stateless POJO Component with attrs types

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
  count: number
}

const MyComp: m.Component<Attrs> = {
  view (vnode) {
    return m('span', `name: ${vnode.attrs.name}, count: ${vnode.attrs.count}`);
  }
};
```

If you prefer the convenience of destructuring, you could rewrite `MyComp` like:

```typescript
const MyComp: m.Component<Attrs> = {
  view ({attrs: {name, count}}) {
    return m('span', `name: ${name}, count: ${count}`);
  }
};
```
#### FactoryComponent (AKA Closure Component)

The simpliest way to annotate a stateful component and the best way to benefit from inference is by holding state in a closure:

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
}

function MyComp(): m.Component<Attrs> {
  let count = 0;
  return {
    view ({attrs}) {
      return m('span', `name: ${attrs.name}, count: ${count}`);
    }
  }
}
```
In the above example, local state types can usually be inferred at declaration time and you don't need to worry about how `this` may be bound since you never need to write `this`.

In the following example, we want to use the initial `Vnode`. Here we annotate the whole function rather than just its return type, and the initial vnode type is inferred.

```typescript
interface Attrs {
  initialValue: number;
  name: string;
}

const MyComp: m.FactoryComponent<Attrs> = v => {
  let initialValue = v.attrs.initialValue
  let count = 0;
  return {
    view ({attrs}) {
      return m('span', `name: ${attrs.name}, count: ${count}`);
    }
  }
};
```

#### Stateful POJO Component

Another way to hold state is in `vnode.state`.

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
}

interface State {
  count: number;
}

const MyComp: m.Component<Attrs, State> = {
  oninit (vnode) {
    vnode.state.count = 0;
  },
  view (vnode) {
    return m('span', `name: ${vnode.attrs.name}, count: ${vnode.state.count}`);
  }
};
```

#### POJO Comp type

In a POJO component hook, `this` is a reference to `vnode.state`. To have `this` inferred correctly, use the `m.Comp` type:

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
}

interface State {
  count: number;
}

const MyComp: m.Comp<Attrs, State> = {
  count: 0,
  view ({attrs}) {
    return m('span', `name: ${attrs.name}, count: ${this.count}`);
  }
};
```

#### ClassComponent

Note that Typescript cannot infer types for class methods. When using classes you must annotate the incoming `Vnode` type for component hook methods.

```typescript
import m from 'mithril';

export interface Attrs {
  name: string;
}

export default class MyComponent implements m.ClassComponent<Attrs> {
  count = 0;
  // Note that class methods cannot infer parameter types
  view ({attrs}: m.CVnode<Attrs>) {
    return m('span', `name: ${attrs.name}, count: ${this.count}`);
  }
}
```

#### Plain view functions

Sometimes you can just as easily use functions in place of components. Usually the return type will be inferred, or you can annotate one if you prefer:

```typescript
function titleView(title: string): m.Children {
  return m('h1', title)
}
```

### `Stream` example:

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
