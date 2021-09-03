const rp = require("request-promise")

class AuthError extends Error {
    private code: number;
    private _fullMessage: string;

    constructor(fullMessage: string) {
        super();
        this._fullMessage = fullMessage;
        this.message = "Not Authorized";
        this.code = 401;
    }
}

export const verifyByToken = async (token: string): Promise<void> => {
    const options = {
        method:  "POST",
        json:    true,
        url:     process.env.sso_url + "/verify",
        headers: {"Authorization": "Bearer " + token},
    };
    try {
        return await rp(options);
    } catch (e) {
        // @ts-ignore
        throw new AuthError(e.error.fullMessage);
    }
}
