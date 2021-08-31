const rp = require('request-promise')

class AuthError extends Error {
    private code: number;

    constructor(fullMessage: string) {
        super();
        this.message = 'Not Authorized';
        this.code = 401;
    }
}

const verifyByToken = async (token): Promise<void> => {
    const options = {
        method:  'POST',
        json:    true,
        url:     process.env.sso_url + '/verify',
        headers: {'Authorization': 'Bearer ' + token},
    };
    try {
        return await rp(options);
    } catch (e) {
        console.error(e);
        throw new AuthError(e.error.fullMessage);
    }
}
module.exports = {verifyByToken}
