import {INotificationInput} from '../interfaces';

interface ExtendedINotificationInput extends INotificationInput {
    content: {
        eventName: string,
        text: string
    }
}

export default function sendMessage({jwt_decode, adminIo, companyIo, userIo}): object {
    return Object.freeze({
        send,
    })

    async function send({
                            sendAddress,
                            content,
                            receiverGroup,
                            notificationType,
                        }
                            : ExtendedINotificationInput)
        : Promise<{ receiverGroup: string; permissions?: string[]; notificationType: string; content: { eventName: string; text: string }; sendAddress: string }> {
        if (sendAddress) {
            const decoded = jwt_decode(sendAddress);
            switch (receiverGroup) {
                case 'admin':
                    if (decoded.permissions.includes('companies')
                        && decoded.permissions.includes('products'))
                        adminIo.emit(content.eventName, {type: notificationType, message: content.text})
                    return {sendAddress, content, receiverGroup, notificationType, permissions: decoded.permissions}
                // break;
                case 'company':
                    companyIo.to(sendAddress).emit(content.eventName, {type: notificationType, message: content.text})
                    return {sendAddress, content, receiverGroup, notificationType}
                // break;
                case 'user':
                    userIo.to(sendAddress).emit(content.eventName, {type: notificationType, message: content.text})
                    return {sendAddress, content, receiverGroup, notificationType}
                // break;
                default:
                    console.log('Receiver Group not found.')
            }
        }
    }
}
