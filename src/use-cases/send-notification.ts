import makeNotification     from "../notification"
import {INotificationInput} from "../interfaces";

export default function makeSendNotification({sendInteractor}) {
    return async function sendNotification(notificationInfo: INotificationInput) {
        const notification = makeNotification(notificationInfo)
        return sendInteractor.send({
            sendAddress:      notification.getSendAddress(),
            content:          notification.getContent(),
            receiverGroup:    notification.getReceiverGroup(),
            notificationType: notification.getNotificationType(),
        })
    }
}
