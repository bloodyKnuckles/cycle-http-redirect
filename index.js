module.exports = function (response) {
  return function (url$) {
    url$.addListener({
      next: url => {
        response.writeHead(302, {'Location': url})
        response.end()
      },
      error: () => {},
      complete: () => {}
    })
  }
}
