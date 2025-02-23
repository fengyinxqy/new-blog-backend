module.exports = () => {
  return async (ctx, next) => {
    // 成功响应方法
    ctx.success = (data = null, message = '操作成功', code = 0, status = 200) => {
      ctx.status = status;
      ctx.body = { code, data, message };
    };

    // 失败响应方法（支持4种传参方式）
    ctx.fail = options => {
      if (options instanceof Error) {
        // 用法1: ctx.fail(new Error('xxx'))
        ctx._handleError(options);
      } else if (typeof options === 'string') {
        // 用法2: ctx.fail('错误信息')
        ctx._handleFail({ message: options });
      } else {
        // 用法3: ctx.fail({ code: 401, message: '未授权' })
        // 用法4: ctx.fail(404, '资源不存在')
        const params = typeof arguments[1] !== 'undefined'
          ? { code: options, message: arguments[1] }
          : options;
        ctx._handleFail(params);
      }
    };

    // 处理错误对象
    ctx._handleError = error => {
      ctx.status = error.status || 500;
      ctx.body = {
        code: error.code || 500,
        message: ctx.app.config.env === 'prod' ? '内部服务器错误' : error.message,
        error: ctx.app.config.env === 'prod' ? undefined : error.stack,
      };
    };

    // 处理普通失败
    ctx._handleFail = ({ code = 500, message = '请求失败' }) => {
      ctx.status = code >= 400 && code < 600 ? code : 500;
      ctx.body = { code, message };
    };

    try {
      await next();
    } catch (err) {
      ctx.fail(err);
    }
  };
};
