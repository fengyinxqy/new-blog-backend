const Service = require('egg').Service;
const bcrypt = require('bcrypt');

class UserService extends Service {
  async create({ username, password, email }) {
    const { ctx } = this;
    const existingUser = await ctx.model.User.findOne({ where: { username } });
    if (existingUser) {
      const error = new Error('用户名已存在');
      error.code = 400;
      throw error;
    }
    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await ctx.model.User.create({ username, password: hashedPassword, email });
    // 删除返回对象中的密码字段
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  async login({ username, password }) {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({ where: { username } });
    if (!user) {
      const error = new Error('用户名或密码错误');
      error.code = 401;
      throw error;
    }
    // 验证密码
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error('用户名或密码错误');
      error.code = 401;
      throw error;
    }
    return user;
  }

  async find(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      const error = new Error('用户不存在');
      error.code = 404;
      throw error;
    }
    return user;
  }
}

module.exports = UserService;
