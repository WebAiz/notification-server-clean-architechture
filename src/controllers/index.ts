const {sendNotification} = require('../use-cases')
import makePostNotification from './post-notification';

const postNotification = makePostNotification({sendNotification})
const NotificationController: object = Object.freeze({
    postNotification,
})

export default NotificationController
export {postNotification}
