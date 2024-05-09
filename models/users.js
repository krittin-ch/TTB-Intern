const { Model } = require('objection')
const Knex = require('knex')
const knexConfig = require('../knexfile')

// Initialize knex
const knex = Knex(knexConfig.development)
Model.knex(knex)

class Users extends Model {
    static get tableName() {
        return 'users'
    }
}

module.exports = { Users }