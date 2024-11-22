import md5 from 'md5'


function generateSecureToken(email: string) {
    return md5(email + process.env.SECRET_KEY);
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
