# assert-needle

This module acts as a small helper to find matching keywords inside strings for assertions.

## Install

```bash
npm i assert-needle
```

## Example

```js
'use strict';

const { expected } = require('assert-needle');

var str = '[1459875739796] WARN : instance.final with output does not support flushing [1459875739796] INFO  (123456 on abcdefghijklmnopqr): beforeExit';
var s$ = [
  'instance.final',
  'output',
  'beforeExit',
  '123456',
  'abcdefghijklmnopqr',
  'WARN',
  'INFO'
];

if(expected(str).output({ has: s$ })) {
    return true;
}
```

## License

GPL-3.0
