const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password, email } = ctx.request.body;
    try {
      const user = await ctx.service.user.create({
        username,
        password,
        email,
      });
      ctx.success(user, '注册成功');
    } catch (error) {
      ctx.fail(error);
    }
  }

  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    try {
      const user = await ctx.service.user.login({
        username,
        password,
      });
      const token = ctx.app.jwt.sign({ id: user.id, username: user.username }, ctx.app.config.jwt.secret, { expiresIn: '1h' });
      ctx.success({ token }, '登录成功');
    } catch (error) {
      ctx.fail(error);
    }
  }

  async profile() {
    const { ctx } = this;
    const user = await ctx.service.user.find(ctx.state.user.id);
    ctx.success(user);
  }
}

module.exports = UserController;
