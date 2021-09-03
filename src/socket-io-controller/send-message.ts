// Interfaces
import {
    ExtendedINotificationInput,
    IDecoded,
    ISendMessage,
    ISendNotification
} from "../interfaces";

import {AuthError, BadRequest, ValidateError} from "../utils";

export class Sender {
    constructor(private readonly _send: ISendNotification) {
    }

    public get send() {
        return this._send
    }
}

export default function sendMessage({jwt_decode, adminIo, companyIo, userIo, verifyByToken}: ISendMessage): Sender {
    async function send({
                            sendAddress,
                            content,
                            receiverGroup,
                            notificationType,
                        }: ExtendedINotificationInput): Promise<object> {
        if (sendAddress && content.hasOwnProperty("eventName") && content.eventName.length > 1) {
            try {
                await verifyByToken(sendAddress)
                const decoded: IDecoded = jwt_decode(sendAddress);
                switch (receiverGroup) {
                    case "admin":
                        if (decoded.permissions.includes("companies")
                            && decoded.permissions.includes("products"))
                            adminIo.emit(content.eventName, {type: notificationType, message: content.text})
                        return {sendAddress, content, receiverGroup, notificationType, permissions: decoded.permissions}
                    // break;
                    case "company":
                        companyIo.to(sendAddress).emit(content.eventName, {
                            type:    notificationType,
                            message: content.text
                        })
                        return {sendAddress, content, receiverGroup, notificationType}
                    // break;
                    case "user":
                        userIo.to(sendAddress).emit(content.eventName, {type: notificationType, message: content.text})
                        return {sendAddress, content, receiverGroup, notificationType}
                    // break;
                    default:
                        return {errMessage: "Receiver Group not found."}
                }
            } catch (e) {
                if (e instanceof AuthError) {
                    throw new AuthError("Not Authorized")
                } else {
                    throw new Error("Unexpected Error in server")
                }
            }
        } else {
            throw new BadRequest("Input Structure is incomplete")
        }
    }

    return new Sender(send)
}
