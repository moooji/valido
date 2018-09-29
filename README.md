# Valido
General purpose check and validation library.

The focus is on providing selected, well tested checks and a convenient API. The library is inspired by other projects, like is_js and joi in terms of the API, but completely written from ground up to be easily extendable and testable.

Contributions are welcome.

## Installing
`npm install valido`

## Usage
````
const is = require('valido');

is.uri('http://www.test.com');
--> true

is.all.uri(['http://www.test.com', 123]);
--> false

is.optional.uri(null);
--> true

is.optional.uri('http://www.test.com');
--> true

is.optional.uri(123);
--> false
````

## API
### all
Will return true if all elements in the list validate to true. Can be combined with all predicates.

````
is.all.number([007, 123]);
--> true

is.all.number(['abc', 123]);
--> false
````

### optional
Will return true if the provided value is either null/undefined or validates to true. Can be combined with all predicates.

````
is.optional.number(null);
--> true

is.optional.number(123);
--> true

is.optional.number('abc');
--> false
````
---

### array(value:any)
Checks if value is an array.

````
is.array([]);
--> true
````

### boolean(value:any)
Checks if value is a boolean.

````
is.boolean(true);
--> true

is.boolean(0);
--> false
````

### buffer(value:any)
Checks if value is a buffer.

````
is.buffer(new Buffer('abc'));
--> true

is.buffer('abc');
--> false
````

### date(value:any)
Checks if value is a date object.

````
is.date(new Date());
--> true

is.date('2016-01-01');
--> false
````

### email(value:any)
Checks if value is a valid email according to [link](https://www.w3.org/TR/html5/forms.html#valid-e-mail-address "W3C recommendation").

````
is.email('bob@test.com');
--> true

is.email('test.com');
--> false
````

### existy(value:any)
Checks if value is not null and not undefined.

````
is.existy(123);
--> true

is.existy(null);
--> false
````

### finite(value:any)
Checks if value is finite.

````
is.finite(123);
--> true

is.finite(2e64);
--> true

is.finite(Infinity);
--> false
````

### function(value:any)
Checks if value is a function.

````
is.function(() => {});
--> true

is.function(function(){});
--> true

is.function('function');
--> false
````

### hexColor(value:any)
Checks if value is a hex color.

````
is.hexColor('#ff3366');
--> true

is.hexColor('#fff');
--> true

is.hexColor('cc33cc');
--> false

is.hexColor('fff');
--> false
````

### integer(value:any)
Checks if value is an integer.

````
is.integer(123);
--> true

is.integer(-1);
--> true

is.integer(2e64);
--> true

is.integer(1.1);
--> false
````

### natural(value:any, option:object)
Checks if value is a natural number.

````
is.natural(123);
--> true

is.natural(0);
--> true

is.natural(0, { disallowZero: true });
--> false

is.natural(1.1);
--> false

is.natural(-1);
--> false
````

### null(value:any)
Checks if value is `null`.

````
is.null(null);
--> true

is.null(0);
--> false

is.null(undefined);
--> false
````

### number(value:any)
Checks if value is of type `number`.

````
is.number(1);
--> true

is.number(Math.PI);
--> true

is.number(NaN);
--> true

is.number(Infinity);
--> true

is.number(2e64);
--> true

is.number('1');
--> false
````

### plainObject(value:any)
Checks if value is a plain object (prototype is Object).

````
is.plainObject({});
--> true

is.plainObject(Object.assign({}));
--> true

is.plainObject(new Object({});
--> true

is.plainObject(function(){});
--> false
````

### stream(value:any)
Checks if value is a stream.

````
const Stream = require('stream');

is.stream(new Stream.Readable());
--> true

is.stream(new Stream.Writable());
--> true

is.stream(new Stream.Transform());
--> true

is.stream(new Stream.PassThrough());
--> true

is.stream(new Stream.Duplex());
--> true

is.stream(123);
--> false
````

### string(value:any, options:object)
Checks if value is a string.

````
is.string('abc');
--> true

is.string('abc', { startsWith: 'a' });
--> true

is.string('abc', { endsWith: 'b' });
--> false

is.string(123);
--> false
````

### undefined(value:any)
Checks if value is undefined.

````
is.undefined(undefined);
--> true

is.undefined(null);
--> false
````

### uri(value:any, options:object)
Checks if value is a URI according to RFC 3986.

````
is.uri('https://8.8.8.8:3128');
--> true

is.uri('https://localhost:80');
--> true

is.uri('mongodb://db.server.com:1234');
--> true

is.uri('https://user:pass@www.test.com:8080/index.html?param=2&yy=abc');
--> true

is.uri('https://www.test.com/', { endsWith: '/' });
--> true

is.uri('https://www.test.com/', { startsWith: 'https://www.other.com' });
--> false

is.uri('google.com');
--> false
````