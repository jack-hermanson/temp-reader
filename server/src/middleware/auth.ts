import { Response, Request } from "express";
import { HTTP } from "jack-hermanson-ts-utils";

export const auth = async (
    req: Request<any>,
    res: Response,
    next: () => any
) => {
    if (req.header("Authentication") === process.env.API_KEY) {
        next();
    } else {
        return res.sendStatus(HTTP.FORBIDDEN);
    }
};
