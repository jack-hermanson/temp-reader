import { Response, Request } from "express";
import { HTTP } from "jack-hermanson-ts-utils";

export const auth = async (req: Request, res: Response, next: () => any) => {
    if (req.headers.authorization === process.env.API_KEY) {
        next();
    } else {
        return res.sendStatus(HTTP.FORBIDDEN);
    }
};
