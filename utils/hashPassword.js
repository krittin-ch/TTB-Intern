const argon2 = require('argon2')
const crypto = require('crypto')

const hashingConfig = { 
    parallelism: 1,
    memoryCost: 64000,
    timeCost: 3
}
 
async function hashPassword(password) {
    let salt = crypto.randomBytes(16)
    return await argon2.hash(password, {
        hashingConfig,
        salt
    })
}
 
async function verifyPasswordWithHash(password, hash) {
    return await argon2.verify(hash, password)
}

module.exports = { hashPassword, verifyPasswordWithHash }