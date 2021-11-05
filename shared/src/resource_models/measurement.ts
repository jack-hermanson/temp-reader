import { ResourceModel } from "jack-hermanson-ts-utils";

export interface MeasurementRequest {
    temperature: number;
    humidity: number;
    generated: Date;
}

export interface MeasurementRecord extends MeasurementRequest, ResourceModel {
    created: Date;
}
