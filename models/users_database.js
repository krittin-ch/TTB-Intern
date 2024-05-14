const { Model } = require('objection')
const Knex = require('knex')
const knexConfig = require('../knexfile')

// Initialize knex
const knex = Knex(knexConfig.development)
Model.knex(knex)

class UserAccount extends Model {
    static get tableName() {
        return 'userAccount'
    }
}

class UserInfo extends Model {
    static get tableName() {
        return 'userInfo'
    }
}


module.exports = { UserAccount, UserInfo }