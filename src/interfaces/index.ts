export interface INotificationInput {
    sendAddress: string,
    content: {
        text: string
    },
    receiverGroup: string,
    notificationType: string
}
