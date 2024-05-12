const argon2 = require('argon2')
const crypto = require('crypto')

async function hashUserId(password) {
    return await crypto.createHash('sha256').update(password).digest('hex');
}
 
module.exports = { hashUserId }