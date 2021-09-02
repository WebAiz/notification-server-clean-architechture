export default {
    path:         '/notifications',
    pingInterval: 10000,
    upgrade:      false,
    serveClient:  false,
    transports:   ['websocket'],
    pingTimeout:  5000,
    cookie:       false,
    cors:         {
        origin:      [process.env.company_url, process.env.admin_url, process.env.market_url, process.env.user_url],
        credentials: true,
        methods:     ['GET', 'POST'],
    },
}
