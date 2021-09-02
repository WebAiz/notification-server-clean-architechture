import {ExtendedINotificationInput, ExtendedINotificationOutput} from "../interfaces";

export default function sendMessage({jwt_decode, adminIo, companyIo, userIo, verifyByToken}) {
    return Object.freeze({
        send,
    })

    async function send({
                            sendAddress,
                            content,
                            receiverGroup,
                            notificationType,
                        }: ExtendedINotificationInput)
        : Promise<ExtendedINotificationOutput | { errMessage: string }> {
        if (sendAddress && content.hasOwnProperty("eventName") && content.eventName.length > 1) {
            try {
                await verifyByToken(sendAddress)
                const decoded = jwt_decode(sendAddress);
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
            } catch (error) {
                return error
            }
        } else {
            return {errMessage: "Request structure is not complete"}
        }
    }
}
