# Typescript Definitions for [Mithril 1.0](https://github.com/lhorie/mithril.js)

Requires TypeScript 2.x.

## Install

For now, install directly from this Github repo with:

	npm install -D github:spacejack/mithril.d.ts#improved

which will add this entry to your package.json devDependencies:

	"@types/mithril": "github:spacejack/mithril.d.ts#improved"

---

### The Gist:

#### POJO `Component` example using `vnode.state`:

```typescript
import * as m from 'mithril'
import {Component} from 'mithril'

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
} as Component<Attrs,State>
```

#### POJO `Comp` example using `this` state:

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
import {FactoryComponent} from 'mithril'

export interface Attrs {
    name: string
}

export default (function (vnode) {
    let count = 0
    view ({attrs}) {
        return m('span', `name: ${attrs.name}, count: ${count}`)
    }
}) as FactoryComponent<Attrs>
```

### Script/Global Usage

If you are adding mithril to your page as a separate script, then you can use the global `m` object. All types are attached to this object. Example:

```typescript
interface Attrs {
	name: string
}

interface State {
	count: number
}

const component = {
	oninit (vnode) {
		vnode.state.count = 0
	},
	view (vnode) {
		return m('span', `name: ${vnode.attrs.name}, count: ${vnode.state.count}`)
	}
} as m.Component<Attrs,State>
```

---

For more example usage see the `tests` folder.

*Note that tests are not intended to run as-is, only that they compile without errors.

To compile the tests:

	npm install
	npm test

---

Pull requests and issues are welcome.
