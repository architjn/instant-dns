# instant-dns
Instantly gets you the latest changes done on the DNS (Within few seconds). This is great for domain verification and other quick verification purposes.

## Installation

```
npm install instant-dns --save
```

## Usage
```js
var dns = require('instant-dns')()

dns.resolveIp4('example.com').then(ip4 => {
  console.log(ip4); // ["93.184.216.34"]
});

```


## API

### Initialize

The module exposes an object with different function which can be called:

```js
var dns = require('instant-dns');
```

#### `dns.resolveIp4(domainName)`

Takes a string and returns an array of IPv4 addresses associated with the supplied domain if any.

#### `dns.resolveCname(domainName)`

Takes a string and returns an array of CNAME Records associated with the supplied domain if any.

#### `dns.resolveMx(domainName)`

Takes a string and returns an array of MX Records associated with the supplied domain if any.

#### `dns.resolveTxt(domainName)`

Takes a string and returns an array of TXT Records associated with the supplied domain if any.


## License

MIT
