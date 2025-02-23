class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    // 等待数据库连接就绪
    await this.app.model.authenticate();

    // 安全同步数据库结构
    await this.app.model.sync({
      force: false, // 永远不要在生产环境设置为 true
      alter: {
        drop: false, // 禁止删除已有字段
      },
    });
  }
}

module.exports = AppBootHook;
