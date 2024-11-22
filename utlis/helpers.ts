import CryptoJS from 'crypto-js'


function generateSecureToken(email: string) {
    const hmac = CryptoJS.HmacMD5(email, process.env.SECRET_KEY);

    return hmac.toString(CryptoJS.enc.Hex)
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
