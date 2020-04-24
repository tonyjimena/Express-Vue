export default router => {
  router.beforeEach((to, from, next) => {
    const REQUIRE_AUTH = to.matched.some(
      record => record.meta.requireAuth
    )

    if (REQUIRE_AUTH) {
      if (!localStorage.getItem('token')) {
        next({
          path: '/login'
        })
      }
    }

    return next()
  })
}
