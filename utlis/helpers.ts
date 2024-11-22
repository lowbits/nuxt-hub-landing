import HmacMD5 from 'crypto-js/hmac-md5'
import enc from 'crypto-js/enc-hex'

function generateSecureToken(email: string) {
    const hmac = HmacMD5(email, process.env.SECRET_KEY);

    return hmac.toString(enc)
}


function compareToken(email, token) {
    return generateSecureToken(email, token) === token
}

function generateVerifyUrl(origin: string, email: string) {
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
