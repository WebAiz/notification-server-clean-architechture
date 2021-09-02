import sendInteractor       from '../socket-io-controller';
import makeSendNotification from './send-notification'

const sendNotification = makeSendNotification({sendInteractor})
const notificationService: object = Object.freeze({
    sendNotification,
})

export default notificationService
export {sendNotification}
