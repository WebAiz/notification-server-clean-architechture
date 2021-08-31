export default function makePostNotification({sendNotification})
    : (httpRequest) => Promise<{ headers: { 'Content-Type': string }; body: { sent: any }; statusCode: number }
    | { headers: { 'Content-Type': string }; body: { error: any }; statusCode: number }> {
    return async function postNotification(httpRequest) {
        try {
            const {...notificationInfo} = httpRequest.body
            const sent = await sendNotification({
                ...notificationInfo,
            })
            return {
                headers:    {
                    'Content-Type': 'application/json',
                },
                statusCode: 201,
                body:       {sent},
            }
        } catch (e) {
            console.log(e)

            return {
                headers:    {
                    'Content-Type': 'application/json',
                },
                statusCode: 400,
                body:       {
                    error: e.message,
                },
            }
        }
    }
}
