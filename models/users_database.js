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

    // static get relationMappings() {
    //     return {
    //         UserInfo: {
    //             relation: Model.BelongsToOneRelation,
    //             modelClass: UserAccount,
    //             join: {
    //                 from: 'userAccount.userName',
    //                 to: 'userInfo.userName'
    //             }
    //         }
    //     }
    // }
}

class UserInfo extends Model {
    static get tableName() {
        return 'userInfo'
    }

    // static get relationMappings() {
    //     return {
    //         UserAccount: {
    //             relation: Model.BelongsToOneRelation,
    //             modelClass: UserInfo,
    //             join: {
    //                 from: 'userInfo.userName',
    //                 to: 'userAccount.userName'
    //             }
    //         }
    //     }
    // }
}


module.exports = { UserAccount, UserInfo }