module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define('user', {
    username: {
      type: STRING(30),
      unique: true,
      allowNull: false,
      index: {
        unique: true,
        fields: [ 'username' ],
        length: 30, // 指定索引长度
      },
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    email: {
      type: STRING(50),
      validate: {
        isEmail: true,
      },
      index: {
        unique: true,
        fields: [ 'email' ],
        length: 50, // 指定索引长度
      },
    },
  });

  return User;
};
