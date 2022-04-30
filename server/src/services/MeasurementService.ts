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

    static async getAll(skip = 0, take = 10): Promise<Measurement[]> {
        const { measurementRepo } = this.getRepos();

        const query = measurementRepo
            .createQueryBuilder()
            .orderBy("generated", "DESC")
            .skip(skip)
            .take(take);

        return await query.getMany();
    }

    static async getAverageTemp(): Promise<number> {
        const { measurementRepo } = this.getRepos();

        const { average } = (await measurementRepo
            .createQueryBuilder("measurement")
            .select('AVG("measurement"."temperature")', "average")
            .getRawOne()) as { average: number };

        return average.round(1);
    }

    static async getCount(): Promise<number> {
        const { measurementRepo } = this.getRepos();

        return await measurementRepo.count();
    }
}
