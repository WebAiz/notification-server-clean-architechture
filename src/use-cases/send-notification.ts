import {makeNotification} from "../notification"

// Interfaces
import {ExtendedINotificationInput} from "../interfaces";
import {Sender}                     from "../socket-io-controller/send-message";

export function makeSendNotification(sendInteractor: Sender) {
    return async function sendNotification(notificationInfo: ExtendedINotificationInput): Promise<object> {
        const notification = makeNotification(notificationInfo)
        return sendInteractor.send({
            sendAddress:      notification.getSendAddress(),
            content:          notification.getContent(),
            receiverGroup:    notification.getReceiverGroup(),
            notificationType: notification.getNotificationType(),
        })
    }
}
