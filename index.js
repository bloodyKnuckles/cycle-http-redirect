module.exports = function (url$) {
  url$.addListener({
    next: url => {
      res.writeHead(302, {'Location': url})
      res.end()
    },
    error: () => {},
    complete: () => {}
  })
}
