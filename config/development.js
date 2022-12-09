const secretKey = process.env.JWTKEY;
const logger = require('../logger');

module.exports = {
  db: {
    database: 'ntask',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'ntask.sqlite',
      logging: (sql) => {
        logger.info(`[${new Date()}]	${sql}`);
      },
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