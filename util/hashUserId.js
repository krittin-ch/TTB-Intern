const argon2 = require('argon2')
const crypto = require('crypto')

const hashingConfig = { 
    parallelism: 1,
    memoryCost: 64000,
    timeCost: 3
}
 
async function hashUserId(password) {
    let salt = crypto.randomBytes(16);
    return await argon2.hash(password, {
        hashingConfig,
        salt
    })
}
 
async function verifyUserIdWithHash(password, hash) {
    return await argon2.verify(hash, password);
}

module.exports = { hashUserId, verifyUserIdWithHash }