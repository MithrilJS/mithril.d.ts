import { trust, parseQueryString, buildQueryString } from '..';
import * as h from '../hyperscript';
import { render } from '../render';
import { redraw } from '../redraw';

const vnode = trust('Some <strong>bold</strong> text.');

const params = parseQueryString('?id=123');

const qstr = buildQueryString({id: 123});

render(document.body, 'Hello');
render(document.body, h('h1', 'Test'));
render(document.body, [
	h('h1', 'Test'), "abc", null, 123, false, h('p', 'Vnode array'),
	['a', 123, undefined, h('div', 'Nested')]
]);

redraw();

redraw.sync();
