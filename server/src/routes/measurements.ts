import { Request, Response, Router } from "express";
import { MeasurementRecord, MeasurementRequest } from "../../../shared";
import { HTTP, validateRequest } from "jack-hermanson-ts-utils";
import { measurementSchema } from "../models/Measurement";
import { MeasurementService } from "../services/MeasurementService";
import { Socket } from "socket.io";
import { SocketEvent } from "../../../shared";
import { auth } from "../middleware/auth";

export const router = Router();

router.post(
    "/",
    auth,
    async (
        req: Request<MeasurementRequest>,
        res: Response<MeasurementRecord>
    ) => {
        if (!(await validateRequest(measurementSchema, req, res))) {
            return;
        }
        const measurement = await MeasurementService.create(req.body);

        // socket
        const socket: Socket = req.app.get("socketio");
        socket.emit(SocketEvent.NEW_MEASUREMENT);

        res.status(HTTP.CREATED).json(measurement);
    }
);

router.get(
    "/",
    async (
        req: Request<any, any, any, { skip: string; take: string }>,
        res: Response<MeasurementRecord[]>
    ) => {
        let skip: number | undefined;
        let take: number | undefined;

        if (req.query.skip) {
            skip = parseInt(req.query.skip);
        }
        if (req.query.take) {
            take = parseInt(req.query.take);
        }

        const measurements = await MeasurementService.getAll(skip, take);

        res.json(measurements);
    }
);

router.get("/average-temp", async (req: Request, res: Response<number>) => {
    const average = await MeasurementService.getAverageTemp();
    res.json(average);
});

router.get("/count", async (req: Request, res: Response<number>) => {
    const count = await MeasurementService.getCount();

    res.json(count);
});
