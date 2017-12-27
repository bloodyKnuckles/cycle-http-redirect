# cycle-http-redirect

### install
`npm install cycle-http-redirect`

### use

```
#!/usr/bin/env node

const run = require('@cycle/run').run
const xs = require('xstream').default
const makeHTMLDriver = require('@cycle/html').makeHTMLDriver
const makeRedirectDriver = require('cycle-http-redirect')
const h1 = require('@cycle/dom').h1

function main (sources) {

  const vdom$ = sources.context
    .filter(function (route) {
      return ('/home' === route || '/about' === route || '/pagenotfound' === route)
    })
    .map(function (route) {
      return h1(route)
    })

  const redirect$ = sources.context
    .filter(function (route) {
      return ('/home' !== route && '/about' !== route && '/pagenotfound' !== route)
    })
    .map(function (route) {
      if ( '/' === route ) { return '/home' }
      else { return '/pagenotfound' }
    })

  return {
    DOM: vdom$,
    REDIRECT: redirect$
  }
}

const http = require('http')
const server = http.createServer(function (req, res) {
  run(main, {
    DOM: makeHTMLDriver(html => res.end(html)),
    context: function () { return xs.of(req.url).remember() } ,
    REDIRECT: makeRedirectDriver(res)
  })
})

server.listen(8080, function () {
  console.log('listening on :' + server.address().port)
})
```
