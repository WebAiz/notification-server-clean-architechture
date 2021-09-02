import {Request, Response, NextFunction} from "express";

export default function makeExpressCallback(controller): (req: Request, res: Response) => void {
    return (req, res): void => {
        const httpRequest = {
            body:    req.body,
            query:   req.query,
            params:  req.params,
            ip:      req.ip,
            method:  req.method,
            path:    req.path,
            headers: {
                "Content-Type": req.get("Content-Type"),
                Referer:        req.get("referer"),
                "User-Agent":   req.get("User-Agent"),
            },
        }
        controller(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                    res.set(httpResponse.headers)
                }
                res.type("json")
                res.status(httpResponse.statusCode).send(httpResponse.body)
            })
            .catch(e => res.status(500).send({error: "An unkown error occurred."}))
    }
}
