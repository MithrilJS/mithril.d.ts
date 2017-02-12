import * as m from 'mithril'

const vnode = m.trust("Some <strong>bold</strong> text.")

const params = m.parseQueryString('?id=123')

const qstr = m.buildQueryString({id: 123})
