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
            return {
                headers:    {
                    "Content-Type": "application/json",
                },
                // @ts-ignore
                statusCode: e.status ? e.status : 400,
                body:       {
                    // @ts-ignore
                    error: e.message,
                    // @ts-ignore
                    details: e?.fields,
                },
            }
        }
    }
}
