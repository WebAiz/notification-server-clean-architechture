// Interfaces
import {
    IPostBodyNotification,
    IPostNotificationOutput,
    ISendNotification
} from "../interfaces";

export function makePostNotification(sendNotification: ISendNotification) {
    return async function postNotification(httpRequest: IPostBodyNotification): Promise<IPostNotificationOutput> {
        try {
            const {...notificationInfo} = httpRequest.body
            const sent = await sendNotification({
                ...notificationInfo,
            })
            return {
                headers:    {
                    "Content-Type": "application/json",
                },
                statusCode: 201,
                body:       {sent},
            }
        } catch (e) {
            console.log(e)
            // @ts-ignore error of type unknown
            return {
                headers:    {
                    "Content-Type": "application/json",
                },
                statusCode: 400,
                body:       {
                    // @ts-ignore
                    error: e.message,
                },
            }

        }
    }
}
