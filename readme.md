# Typescript Definitions for [Mithril 2.x](https://github.com/lhorie/mithril.js)

Types are maintained at [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). Submit PRs there but you can submit issues, questions or suggestions here.

## Install

Requires TypeScript 3.2 or later.

Install types for the current version of Mithril from npm with:

    npm install -D @types/mithril

For pre-release versions of Mithril, the `next` branch on this repo will align with the `next` branch of Mithril. You can install these types with:

    npm install -D MithrilJS/mithril.d.ts#next

It's not recommended to install any other branches, including master, from this repo. Use npm/DefinitelyTyped for official releases.

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
These settings may depend on the bundler you're using.

---

## The Gist:

### Component examples

#### Simple, stateless POJO Component with attrs types

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
  count: number;
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
#### ClosureComponent (AKA FactoryComponent)

The easiest way to annotate a stateful component and to make best use of inference is by holding state in a closure:

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
  initialValue: number;
}

function Counter(): m.Component<Attrs> {
  let count = 0;
  function increment() {
    count++;
  }
  function decrement() {
    count--;
  }
  return {
    oninit ({attrs}) {
      count = attrs.initialValue;
    },
    view ({attrs}) {
      return m('.counter',
        m('span', `name: ${attrs.name}, count: ${count}`),
        m('button', {onclick: increment}, '+'),
        m('button', {onclick: decrement}, '-')
      );
    }
  };
}
```
In the above example, local state types can usually be inferred at declaration time and you don't need to worry about how `this` may be bound since you never need to write `this`.

In the following example, we want to use the initial `Vnode`. Here we annotate the whole function rather than just its return type, and the initial vnode type is inferred.

```typescript
interface Attrs {
  name: string;
  initialValue: number;
}

const Counter: m.ClosureComponent<Attrs> = vnode => {
  let count = vnode.attrs.initialValue
  function increment() {
    count++;
  }
  function decrement() {
    count--;
  }
  return {
    view ({attrs}) {
      return m('.counter',
        m('span', `name: ${attrs.name}, count: ${count}`),
        m('button', {onclick: increment}, '+'),
        m('button', {onclick: decrement}, '-')
      );
    }
  };
};
```

#### ClassComponent

Note that Typescript cannot infer types for class methods. When using classes you must annotate the incoming `Vnode` type for component hook methods.

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
  initialValue: number;
}

class Counter implements m.ClassComponent<Attrs> {
  count = 0;
  // Use arrow functions so `this` is bound as expected
  increment = () => {
    this.count++;
  };
  decrement = () => {
    this.count--;
  };
  // The constructor can be used in place of oninit
  constructor({attrs}: m.CVnode<Attrs>) {
    this.count = attrs.initialValue;
  }
  // Note that class methods cannot infer parameter types
  view ({attrs}: m.CVnode<Attrs>) {
    return m('.counter',
      m('span', `name: ${attrs.name}, count: ${this.count}`),
      m('button', {onclick: this.increment}, '+'),
      m('button', {onclick: this.decrement}, '-')
    );
  }
}
```

#### Stateful POJO Component

Another way to hold state is in `vnode.state`.

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
  initialValue: number;
}

interface State {
  count: number;
  increment(): void;
  decrement(): void;
}

const Counter: m.Component<Attrs, State> = {
  oninit ({state}) {
    state.count = 0;
    state.increment = () => {state.count++};
    state.decrement = () => {state.count--};
  },
  view ({attrs, state}) {
    return m('.counter',
      m('span', `name: ${attrs.name}, count: ${state.count}`),
      m('button', {onclick: state.increment}, '+'),
      m('button', {onclick: state.decrement}, '-')
    );
  }
};
```

#### POJO Comp type

In a POJO component hook, `this` is a reference to `vnode.state`. To have `this` inferred correctly, use the `m.Comp` type.

```typescript
import m from 'mithril';

interface Attrs {
  name: string;
  initialValue: number;
}

interface State {
  count: number;
  increment(): void;
  decrement(): void;
}

const Counter: m.Comp<Attrs, State> = {
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  },
  oninit ({attrs}) {
    this.count = attrs.initialValue;
  },
  view ({attrs}) {
    return m('.counter',
      m('span', `name: ${attrs.name}, count: ${this.count}`),
      m('button', {onclick: () => {this.increment()}}, '+'),
      m('button', {onclick: () => {this.decrement()}}, '-')
    );
  }
};
```

#### Plain view functions

Sometimes you can just as easily use functions in place of components. Usually the return type will be inferred as being compatible with `m.Children`, or you can annotate it specifically if you prefer:

```typescript
function titleView(title: string): m.Children {
  return m('h1', title);
}
```

### Stream example:

```typescript
import Stream from 'mithril/stream';

const num = Stream(1);
const text = Stream<string>();
let s: Stream<Foo>;
s = Stream(new Foo());
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
