module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt);

  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);
  router.get('/profile', jwt, controller.user.profile); // 需要鉴权的路由
};
