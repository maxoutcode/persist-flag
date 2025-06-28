<div align="center">
<br>

<h1>persist-flag</h1>

<p><sup>Lightweight persistent flag manager with query disabling and scoped key storage</sup></p>

[![npm](https://img.shields.io/npm/v/persist-flag.svg?colorB=brightgreen)](https://www.npmjs.com/package/persist-flag)
[![GitHub package version](https://img.shields.io/github/package-json/v/ux-ui-pro/persist-flag.svg)](https://github.com/ux-ui-pro/persist-flag)
[![NPM Downloads](https://img.shields.io/npm/dm/persist-flag.svg?style=flat)](https://www.npmjs.org/package/persist-flag)

<sup>700B gzipped</sup>

</div>
<br>

&#10148; **Install**
```bash
yarn add persist-flag
```
<br>

&#10148; **Import**
```ts
import PersistFlag from 'persist-flag';
```
<br>

&#10148; **Usage**
```typescript
const pf = new PersistFlag({
  namespace: 'myapp',
  disableQuery: 'no-flags',
  storage: 'session',
});

pf.set('onboarding-complete');
pf.on('onboarding-complete', (value) => console.log('Flag value:', value));
```
<br>

&#10148; **Options**

| Option          | Type                     | Default   | Description                                                    |
|-----------------|--------------------------|-----------|----------------------------------------------------------------|
| `namespace`     | `string`                 | `'pf'`    | Prefix for all stored keys.                                    |
| `disableQuery`  | `string`                 | `'test'`  | If this query param is in the URL, flags are disabled (no-op). |
| `storage`       | `'local'` \| `'session'` | `'local'` | Choose between `localStorage` and `sessionStorage`.            |
<br>

&#10148; **API**

| Method             | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `set(flag, value)` | Persists the flag with the given value (`'1'` by default).                  |
| `get(flag)`        | Retrieves the stored value for a flag.                                      |
| `has(flag)`        | Returns `true` if the flag exists in storage.                               |
| `on(flag, cb)`     | If flag exists, calls `cb` with its value and returns `true`; else `false`. |
| `reset(flag?)`     | Removes a single flag or all flags in the namespace.                        |
| `init(map)`        | Accepts a flag map of `flag: true` or `flag: callback`.                     |
<br>

&#10148; **Disabling via URL**

To bypass all flag behavior (e.g. in testing or specific environments), append the `disableQuery` key to the URL:

```
https://your-app.com?test
```
<br>

&#10148; **License**

persist-flag is released under the MIT license.
