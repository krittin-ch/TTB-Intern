// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
      client: 'mysql',
      connection: {
      host: '127.0.0.1',
      user: 'root', // replace with your mysql username
      password: '123456', // replace with your mysql password
      database: 'user_information'
    },
    debug: true
  }
};
