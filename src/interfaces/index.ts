import {JwtDecodeOptions}      from "jwt-decode";
import {Socket}                from "socket.io";

export interface INotificationInput {
    sendAddress: string,
    content:object,
    receiverGroup?: string,
    notificationType: string
}

export interface ExtendedINotificationInput extends INotificationInput {
    content: {
        eventName: string,
        text: string
    }
}

export interface ExtendedINotificationOutput extends ExtendedINotificationInput {
    permissions?: string[]
}

export interface IController {
    (httpRequest: IPostBodyNotification): Promise<any>
}

export interface IVerifyByToken {
    (s: string): Promise<void>
}

export interface IJwtDecode {
    <T = object>(token: string, options?: JwtDecodeOptions | undefined): T
}

export interface IDecoded {
    permissions: string[]
}

export interface ISendMessage {
    jwt_decode: IJwtDecode,
    adminIo: Socket,
    companyIo: Socket,
    userIo: Socket,
    verifyByToken: IVerifyByToken,
}

export interface ISendNotification {
    (arg: ExtendedINotificationInput): Promise<object>
}

export interface IPostBodyNotification {
    body: ExtendedINotificationInput
}

export interface IPostNotificationOutput {
    headers: { "Content-Type": string };
    body: { sent: object } | { error: unknown }
    statusCode: number;
}
