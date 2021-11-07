import { Request, Response, Router } from "express";
import { MeasurementRecord, MeasurementRequest } from "../../../shared";
import { HTTP, validateRequest } from "jack-hermanson-ts-utils";
import { measurementSchema } from "../models/Measurement";
import { MeasurementService } from "../services/MeasurementService";

export const router = Router();

router.post(
    "/",
    async (
        req: Request<MeasurementRequest>,
        res: Response<MeasurementRecord>
    ) => {
        if (!(await validateRequest(measurementSchema, req, res))) {
            return;
        }
        const measurement = await MeasurementService.create(req.body);
        res.status(HTTP.CREATED).json(measurement);
    }
);

router.get("/", async (req: Request, res: Response<MeasurementRecord[]>) => {
    const measurements = await MeasurementService.getAll();
    res.json(measurements);
});
