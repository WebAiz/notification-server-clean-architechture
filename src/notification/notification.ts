// Interfaces
import {ExtendedINotificationInput} from "../interfaces/"
import {ValidateError}              from "../utils";

export function buildMakeNotification() {
    return function makeNotification({
                                         sendAddress,
                                         content,
                                         receiverGroup,
                                         notificationType,
                                     }: ExtendedINotificationInput) {
        if (!sendAddress || sendAddress.length < 1) {
            throw new ValidateError({"sendAddress": {message: "sendAddress must include at least one character of message."}}, "Invalid sendAddress")
        }
        if (!content.hasOwnProperty("text") || content.text.length < 1) {
            throw new ValidateError({"content": {message: "Notification content must include at least text key and value."}}, "Invalid content")
        }
        if (notificationType && notificationType.length < 1) {
            throw new ValidateError({"notificationType": {message: "If supplied. Notification must contain a valid notificationType."}}, "Invalid notificationType")
        }
        // Note: receiverGroup is a optional parameter

        return Object.freeze({
            getSendAddress:      () => sendAddress,
            getReceiverGroup:    () => receiverGroup,
            getContent:          () => content,
            getNotificationType: () => notificationType,
        })
    }
}
