export default ({ app }) => {
  app.router.beforEach((from, to, next) => {
    if (to == 'person/self' && !window.localStorage.getItem('token')) {
      return
    }
    next()
  })
}
