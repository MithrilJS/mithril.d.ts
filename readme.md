# Typescript Definitions for [Mithril 1.0](https://github.com/lhorie/mithril.js)

Requires TypeScript 2.x.

## Install

For now, install directly from this Github repo with:

	npm install -D github:spacejack/mithril.d.ts#1.0.2

which will add this entry to your package.json devDependencies:

	"@types/mithril": "github:spacejack/mithril.d.ts#1.0.2"

**If you are not bundling** and instead are including mithril.js in a separate script tag then you will need to install the global version. You can find that [here](https://github.com/spacejack/mithril-global.d.ts).

---

### The Gist:

Here is a very basic component/module example:

```typescript
import * as m from 'mithril'

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
} as Mithril.Component<Attrs,State> & State
```

For more example usage see the `tests` folder.

*Note that tests are not intended to run as-is, only that they compile without errors.

To compile the tests:

	npm install
	npm test

---

Pull requests and issues are welcome.
