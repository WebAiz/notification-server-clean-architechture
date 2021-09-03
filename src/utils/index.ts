import {Exception, FieldErrors} from "../interfaces";

const rp = require("request-promise")

export class AuthError extends Error {
    public status: number;
    private _fullMessage: string;

    constructor(fullMessage: string) {
        super();
        this._fullMessage = fullMessage;
        this.message = "Not Authorized";
        this.status = 401;
    }
}

export class BadRequest extends Error {
    public message: string;
    private status: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.status = 400;
    }
}

export class ValidateError extends Error implements Exception {
    public status = 422;
    public name = "ValidateError";

    constructor(public fields: FieldErrors, public message: string) {
        super(message);
        Object.setPrototypeOf(this, ValidateError.prototype);
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
        if (e.response.statusCode === 401) {
            // @ts-ignore
            throw new AuthError(e.error.fullMessage)
        } else {
            throw new Error("SSO verify failed")
        }
    }
}
