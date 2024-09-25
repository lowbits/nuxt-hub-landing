import crypto from 'crypto'


function generateSecureToken(email: string) {
    const hmac = crypto.createHmac('md5', process.env.SECRET_KEY)

    return hmac.update(email).digest('hex')
}


function compareToken(email, token) {
    return generateSecureToken(email, token) === token
}

export {
    compareToken,
    generateSecureToken
}
