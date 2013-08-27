# Former

## Work in progress

Serialize/deserialize HTML forms to/from json

Requires form elements to be named using dot notation, i.e.

```html
<input type="text" name="user.name">
```

## Usage

### Serialize
```js
var former = require("former");

var $form = $('form#theform');
 
var data = former.serialize($form);
console.log(data);

```

### Deserialize
```js
var former = require("former");
 
var data = {user: {name: "Doris"}};

var $form = $('form#theform');

former.deserialize($form, data);

```