# Typescript Definitions for [Mithril 1.0](https://github.com/lhorie/mithril.js)

Requires TypeScript 2.x.

## Install

For now, install directly from this Github repo with:

	npm install -D github:spacejack/mithril.d.ts#improved

which will add this entry to your package.json devDependencies:

	"@types/mithril": "github:spacejack/mithril.d.ts#improved"

---

### The Gist:

Here is a very basic component/module example:

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
	count: 0,
	view ({attrs}) {
		return m('span', `name: ${attrs.name}, count: ${this.count}`)
	}
} as Component<Attrs,State> & State
```

For more example usage see the `tests` folder.

*Note that tests are not intended to run as-is, only that they compile without errors.

To compile the tests:

	npm install
	npm test

---

Pull requests and issues are welcome.
