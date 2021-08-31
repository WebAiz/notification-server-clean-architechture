import makeNotification from '../notification'

export default function makeSendNotification({sendInteractor}) {
    return async function sendNotification(notificationInfo) {
        const notification = makeNotification(notificationInfo)
        return sendInteractor.send({
            sendAddress:      notification.getSendAddress(),
            content:          notification.getContent(),
            receiverGroup:    notification.getReceiverGroup(),
            notificationType: notification.getNotificationType(),
        })
    }
}
