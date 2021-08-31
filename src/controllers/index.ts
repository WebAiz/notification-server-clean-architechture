const {sendNotification} = require('../use-cases')
// const makePostNotification = require('./post-notification')
import makePostNotification from './post-notification';

const postNotification = makePostNotification({sendNotification})
const NotificationController: object = Object.freeze({
    postNotification,
})

export default NotificationController
export {postNotification}
