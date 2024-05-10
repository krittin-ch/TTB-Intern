const argon2 = require('argon2');

async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password);
        return hash
    } catch (err) {
        console.log(err);
    }
}

async function verifyPassword(hash, password) {
    try {
        if (await argon2.verify(hash, password)) {
            console.log('Password is correct!');
        } else {
            console.log('Password is incorrect!');
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { hashPassword, verifyPassword }