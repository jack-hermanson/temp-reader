import { Request, Response, Router } from "express";
import { MeasurementRecord, MeasurementRequest } from "../../../shared";

export const router = Router();

// router.post(
//     "/",
//     async (
//         req: Request<MeasurementRequest>,
//         res: Response<MeasurementRecord>
//     ) => {
//          await res.json(null);
//     }
// );

router.get("/", async (req: Request, res: Response) => {
    res.json({});
});
