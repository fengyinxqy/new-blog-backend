module.exports = (options, app) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if (!token) {
      ctx.throw(401, '没有提供 token');
    }
    try {
      const decoded = app.jwt.verify(token, app.config.jwt.secret);
      ctx.state.user = decoded;
      await next();
    } catch (err) {
      ctx.throw(401, 'token 失效');
    }
  };
};
