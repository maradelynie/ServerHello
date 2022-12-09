const	secretKey	=	process.env.JWTKEY;

module.exports = {
  db: {
    database: 'ntask_test',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'ntask_test.sqlite',
      logging: false,
      define: {
        underscored: true
      }
    }
  },
  jwt: {
    secret: secretKey,
    options: { session: false }
  }
};
