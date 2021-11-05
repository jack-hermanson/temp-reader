import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import Joi from "joi";

@Entity({name: "measurement"})
export class Measurement {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable: false, type: "float"})
    temperature!: number;

    @Column({nullable: false, type: "float"})
    humidity!: number;

    @Column({nullable: false, type: "datetime"})
    generated!: Date; // when raspberry pi generated request

    @CreateDateColumn()
    created!: Date; // received
}

export const measurementSchema = Joi.object().keys({
    temperature: Joi.number().required(),
    humidity: Joi.number().required(),
    generated: Joi.date().required()
});