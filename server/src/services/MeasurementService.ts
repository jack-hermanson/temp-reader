import { MeasurementRequest } from "../../../shared";
import { Measurement } from "../models/Measurement";
import { getConnection, Repository } from "typeorm";

export abstract class MeasurementService {
    static getRepos(): {
        measurementRepo: Repository<Measurement>;
    } {
        const connection = getConnection();
        const measurementRepo = connection.getRepository(Measurement);
        return {
            measurementRepo,
        };
    }

    static async create(
        measurementRequest: MeasurementRequest
    ): Promise<Measurement> {
        const { measurementRepo } = this.getRepos();

        return await measurementRepo.save(measurementRequest);
    }

    static async getAll(): Promise<Measurement[]> {
        const { measurementRepo } = this.getRepos();

        const query = measurementRepo
            .createQueryBuilder()
            .orderBy("generated", "DESC")
            .take(15);

        return await query.getMany();
    }
}
