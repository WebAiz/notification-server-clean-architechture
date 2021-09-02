export interface INotificationInput {
    sendAddress: string,
    content: {
        text: string
    },
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
