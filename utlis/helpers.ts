import { createHmac } from 'node:crypto'


function generateSecureToken(email: string) {
    const hmac = createHmac('md5', process.env.SECRET_KEY)

    return hmac.update(email).digest('hex')
}


function compareToken(email, token) {
    return generateSecureToken(email, token) === token
}

function  generateVerifyUrl(origin: string, email: string)  {
    const verifyUrl = new URL('/verify', origin);
    verifyUrl.searchParams.set('email', email);
    verifyUrl.searchParams.set('token', generateSecureToken(email));

    return verifyUrl.toString();
}


export {
    compareToken,
    generateSecureToken,
    generateVerifyUrl,
}
