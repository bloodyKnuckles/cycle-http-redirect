# cycle-http-redirect

### install
`npm install cycle-http-redirect`

### use

```
const run = require('@cycle/run').run
const makeHTMLDriver = require('@cycle/html').makeHTMLDriver
const redirectDriver = require('cycle-http-redirect')

const main = require('./main')

const http = require('http')
const server = http.createServer(function (req, res) {
  run(main, {
    DOM: makeHTMLDriver(html => res.end(html)),
    REDIRECT: redirectDriver(res)
  })
})

server.listen(8080, function () {
  console.log('listening on :' + server.address().port)
})

```
