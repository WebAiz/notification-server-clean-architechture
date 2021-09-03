// Interfaces
import {ExtendedINotificationInput} from "../interfaces/"

export function buildMakeNotification() {
    return function makeNotification({
                                         sendAddress,
                                         content,
                                         receiverGroup,
                                         notificationType,
                                     }: ExtendedINotificationInput) {
        if (!sendAddress || sendAddress.length < 1) {
            throw new Error("sendAddress must include at least one character of message.")
        }
        if (!content.hasOwnProperty("text") || content.text.length < 1) {
            throw new Error("Notification content must include at least text key.")
        }
        if (notificationType && notificationType.length < 1) {
            throw new Error("If supplied. Notification must contain a valid notificationType.")
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
