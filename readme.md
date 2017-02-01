# Typescript Definitions for [Mithril](https://github.com/lhorie/mithril.js) 1.0

Requires TypeScript 2.x.

See `mithril-tests.ts` for example usage.

## Install

For now, install directly from this Github repo with:

	npm install -D github:spacejack/mithril.d.ts#1.0.0

which will add this entry to your package.json devDependencies:

	"@types/mithril": "github:spacejack/mithril.d.ts"

**If you are not bundling** and instead are including mithril.js in a separate script tag then you will need to install the global version. You can find that [here](https://github.com/spacejack/mithril-global.d.ts).

---

### Trying stuff out

The easiest way to look at what's going on with the types is to install VSCode or some other editor/IDE with good TS language support. Open the `mithril-tests.ts` file and then hover the cursor over variables to inspect types. Try making changes and adding other code that uses the mithril API.

Do an `npm install` if you want to compile the test file. Simply run `tsc` or `npm test`.

---

Pull requests and issues are welcome.
