# Typescript Definitions for [Mithril 1.1](https://github.com/lhorie/mithril.js)

Requires TypeScript 2.x.

## Install

Install from npm with:

	npm install -D @types/mithril

Alternately, install directly from this Github repo with:

	npm install -D github:spacejack/mithril.d.ts#1.1.5

which will add this entry to your package.json devDependencies:

	"@types/mithril": "github:spacejack/mithril.d.ts#1.1.5"

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

---

### The Gist:

#### POJO `Component` example using `vnode.state`:

```typescript
import * as m from 'mithril'

export interface Attrs {
	name: string
}

interface State {
	count: number
}

export default {
	oninit (vnode) {
		vnode.state.count = 0
	},
	view (vnode) {
		return m('span', `name: ${vnode.attrs.name}, count: ${vnode.state.count}`)
	}
} as m.Component<Attrs,State>
```

Note that all types can be accessed via `m` as above.

#### POJO `Comp` example using `this` state, importing `Comp` type separately:

```typescript
import * as m from 'mithril'
import {Comp} from 'mithril'

export interface Attrs {
	name: string
}

interface State {
	count: number
}

export default {
	count: 0,
	view ({attrs}) {
		return m('span', `name: ${attrs.name}, count: ${this.count}`)
	}
} as Comp<Attrs,State>
```

#### `ClassComponent` example:

```typescript
import * as m from 'mithril'
import {ClassComponent, CVnode} from 'mithril'

export interface Attrs {
    name: string
}

export default class MyComponent implements ClassComponent<Attrs> {
    count = 0
    // Note that class methods cannot infer parameter types
    view ({attrs}: CVnode<Attrs>) {
        return m('span', `name: ${attrs.name}, count: ${this.count}`)
    }
}
```

#### `FactoryComponent` example:

```typescript
import * as m from 'mithril'

export interface Attrs {
    name: string
}

export default (function (vnode) {
    let count = 0
    view ({attrs}) {
        return m('span', `name: ${attrs.name}, count: ${count}`)
    }
}) as m.FactoryComponent<Attrs>
```

#### `Stream` example:

```typescript
import * as stream from 'mithril/stream'
import {Stream} from 'mithril/stream'

const num = stream(1)
const text = stream<string>()
let s: Stream<Foo>
s = stream(new Foo())
```
---

## Script/Global Usage

If you are adding mithril to your page as a separate script, then you can install the [global version](https://github.com/spacejack/mithril-global.d.ts) of these types.

---

For more example usage see the `test` folder.

*Note that tests are not intended to run as-is, only that they compile without errors.

To compile the tests:

	npm install
	npm test

---

Pull requests and issues are welcome.
